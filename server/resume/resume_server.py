import grpc
import concurrent
from concurrent import futures
from ResumeGenerator import ResumeGenerator
import resume_pb2
import resume_pb2_grpc
from decodeFile import decodeFile
from encodeFile import encodeFile

class ResumeServicer(resume_pb2_grpc.ResumeServicer):
    generator = ResumeGenerator()
    decoder = decodeFile()
    encoder = encodeFile()
    def GenerateResume(self, request, context):
        print('we got something!!')

        response = resume_pb2.ResumeResponse()
        print('created response')
        encodedJson = request.encoded_file
        print('set encodedJson')
        with open('encodedFileTEST.txt', "rb") as encoded_file:
          encoded_file.write(encodedJson)
        resume = generator.generateResume('./encodedFile.txt')
        print('resume generated')
        encodedResume = encoder.encodeFile('./Resume.pdf')
        print('resume encoded')
        response.file = encodedResume
        return response

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    resume_pb2_grpc.add_ResumeServicer_to_server(ResumeServicer(), server)
    print('Server Started. Listening on port 50051')
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

main()
