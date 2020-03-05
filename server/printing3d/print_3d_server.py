import grpc
import logging
import concurrent
from concurrent import futures

import print_3d_pb2
import print_3d_pb2_grpc
import subprocess
import os
from os import sep


class Printer3DServicer(print_3d_pb2_grpc.Printer3DServicer):
    CUURENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + sep
    proc = None

    def Print(self, request, context):
        response = print_3d_pb2.PrintResponse()
        response.message = 'the pi thinks you are cool'
        return response
    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print_3d_pb2_grpc.add_Printer3DServicer_to_server(Printer3DServicer(), server)
    print('Starting server. Listening on port 50051.')
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    logging.basicConfig()
    serve()
