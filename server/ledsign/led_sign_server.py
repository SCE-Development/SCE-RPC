import grpc
import logging
import concurrent
from concurrent import futures

import led_sign_pb2
import led_sign_pb2_grpc
import subprocess
import os
from os import sep


class LedSignServicer(led_sign_pb2_grpc.LedSignServicer):
    CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + sep
    proc = None

    def WriteCommandToSign(self, request):
        command = [
                self.CURRENT_DIRECTORY + "sce_sign.exe",
                "--set-text", request.text,
                "--set-brightness", str(request.brightness) + "%",
                "--set-speed", str(request.scroll_speed) + " px/vsync",
                "--set-background-color", request.background_color[1:],
                "--set-font-color", request.text_color[1:],
                "--set-border-color", request.border_color[1:],
                "--set-font-filename", self.CURRENT_DIRECTORY + "fonts/9x18B.bdf",
            ]
        print(command)
        
        if self.proc != None:
            self.proc.kill()

        self.proc = subprocess.Popen(command)
        

    def UpdateSignText(self, request, context):
        response = led_sign_pb2.LedSignResponse()
        response.message = 'hello from pi'
        self.WriteCommandToSign(request)
        print('we got something!')
        return response

    def HealthCheck(self, request, context):
        response = led_sign_pb2.HealthCheckResponse()
        response.message = f'hey {request.officer_name} im doing great!'
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    led_sign_pb2_grpc.add_LedSignServicer_to_server(LedSignServicer(), server)
    print('Starting server. Listening on port 50051.')
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
