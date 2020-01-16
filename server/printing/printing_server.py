import grpc
from concurrent import futures
import logging

import print_pb2
import print_pb2_grpc

import print_me


class PrintServicer(print_pb2_grpc.PrinterServicer):

    def PrintPage(self, request, context):
        response = print_pb2.PrintResponse()
        response.message = print_me.PrintMe(
            raw=request.encoded_file, d=request.destination,
            n=request.copies, options=request.options)
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print_pb2_grpc.add_PrinterServicer_to_server(PrintServicer(), server)
    print('Starting server. Listening on port 50051.')
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
