import grpc
import concurrent
from concurrent import futures

import aws_rekognition_pb2
import aws_rekognition_pb2_grpc

import boto3
# from PIL import Image, ImageDraw, ImageFont
from PIL import Image
from io import BytesIO

import json

class FaceImageServicer(aws_rekognition_pb2_grpc.FaceImageServicer):
    def RequestFaceCoordinate(self, request, context):
        print('we got something')
        response = aws_rekognition_pb2.FaceCoordinateResponse()
        stream = BytesIO(request.faceImage)
        image = Image.open(stream).convert("RGBA")
        stream.close()
        
        imagesize = [image.size[0],image.size[1]]

        print("Reading configs")

        with open("../../client/config/config.json") as f:
            AWSKEY = json.load(f)['AWSRekognition']

        bucket = AWSKEY['BUCKET']
        region = AWSKEY['REGION']
        accessid = AWSKEY['AWSACCESSKEYID']
        secretkey = AWSKEY['AWSSECRETKEY']

        print("Creating clients")

        s3Client = boto3.client(
            "s3",
            aws_access_key_id=accessid,
            aws_secret_access_key=secretkey,
            region_name=region
            )
        rekognitionClient = boto3.client(
            "rekognition",
            aws_access_key_id=accessid,
            aws_secret_access_key=secretkey,
            region_name=region
            )

        print("Going to do stuff with client")
        imgnames = get_image_names(s3Client, bucket)
        print(imgnames)
        faces = get_face_coordinates(rekognitionClient, request.faceImage, imgnames, bucket, region)
        print(faces)
        for facename, faceBB in faces:
            face = response.faces.add()
            [face.name, face.tlx, face.tly, face.brx, face.bry] = get_bounding_box(facename, faceBB, imagesize)
        print("sending back")
        return response


def get_image_names(client, bucket):
    # print("In image names")
    response = client.list_objects_v2(
        Bucket=bucket
    )
    # print(response)
    contents = response['Contents']
    imgnames = [obj["Key"] for obj in contents]
    return imgnames


def get_bounding_box(name, bb, iz):
    lx = round(bb["Left"] * iz[0])
    ly = round(bb["Top"] * iz[1])
    rx = round((bb["Left"] + bb["Width"]) * iz[0])
    ry = round((bb["Top"] + bb["Height"]) * iz[1])
    return [name,lx,ly,rx,ry]


def get_face_coordinates(client, target, source, bucket, region):
    cid = "faces"
    client.create_collection(
        CollectionId=cid
    )
    client.index_faces(
        CollectionId=cid,
        Image={'Bytes': target}
    )

    faces = []

    for i in range(len(source)):
        facename = source[i]
        print("\nChecking " + str(i+1) + " / " + str(len(source)) + " : " + facename)
        print("\twaiting response")
        response = client.search_faces_by_image(
            CollectionId=cid,
            Image={'S3Object':{'Bucket':bucket,'Name':facename}},
            FaceMatchThreshold=90
        )
        print("got response")

        if len(response["FaceMatches"]) == 0:
            print("\tNot In Picture")
            continue

        matchface = max(response['FaceMatches'], key=lambda x: x['Similarity'])
        bb = matchface['Face']['BoundingBox']

        faces.append([facename,bb])

        if matchface:
            client.delete_faces(
                CollectionId=cid,
                FaceIds=[matchface['Face']['FaceId']]
            )

    client.delete_collection(
        CollectionId=cid
    )

    return faces


def main():
    # with open("../../client/config/config.json") as f:
    #     AWSKEY = json.load(f)['AWSRekognition']
    # bucket = AWSKEY['BUCKET']
    # region = AWSKEY['REGION']
    # accessid = AWSKEY['AWSACCESSKEYID']
    # secretkey = AWSKEY['AWSSECRETKEY']
    # s3Client = boto3.client(
    #     "s3",
    #     aws_access_key_id=accessid,
    #     aws_secret_access_key=secretkey,
    #     region_name=region
    #     )
    # get_image_names(s3Client, bucket)


    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    aws_rekognition_pb2_grpc.add_FaceImageServicer_to_server(FaceImageServicer(), server)
    print("server started")
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

main()