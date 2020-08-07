import grpc
import logging
from concurrent import futures

import print_3d_pb2
import print_3d_pb2_grpc
import os
from os import sep


class Printer3dServicer(print_3d_pb2_grpc.Printer3dServicer):
    CUURENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + sep
    proc = None

    def Handle3dPrint(self, request, context):
        response = print_3d_pb2.Print3dResponse()
        response.message = "the pi thinks you are cool"
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print_3d_pb2_grpc.add_Printer3dServicer_to_server(
        Printer3dServicer(), server
    )
    print("Starting server. Listening on port 50053.")
    server.add_insecure_port("[::]:50053")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
