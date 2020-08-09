import grpc
import logging
from concurrent import futures

import led_sign_pb2
import led_sign_pb2_grpc
import subprocess
import os
from os import sep


class LedSignServicer(led_sign_pb2_grpc.LedSignServicer):
    CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + sep
    proc = None
    sign_data = {}

    def WriteCommandToSign(self, request):
        command = [
            self.CURRENT_DIRECTORY + "sce_sign.exe",
            "--set-text",
            request.text,
            "--set-brightness",
            str(request.brightness) + "%",
            "--set-speed",
            str(request.scroll_speed) + " px/vsync",
            "--set-background-color",
            request.background_color[1:],
            "--set-font-color",
            request.text_color[1:],
            "--set-border-color",
            request.border_color[1:],
            "--set-font-filename",
            self.CURRENT_DIRECTORY + "fonts/9x18B.bdf",
        ]
        print(command)
        self.sign_data["text"] = request.text
        self.sign_data["brightness"] = request.brightness
        self.sign_data["scroll-speed"] = request.scroll_speed
        self.sign_data["background-color"] = request.background_color
        self.sign_data["font-color"] = request.text_color
        self.sign_data["border-color"] = request.border_color

        if self.proc is not None:
            self.proc.kill()

        self.proc = subprocess.Popen(command)

    def UpdateSignText(self, request, context):
        response = led_sign_pb2.LedSignMessage()
        response.message = "hello from pi"
        self.WriteCommandToSign(request)
        print("we got something!")
        return response

    def HealthCheck(self, request, context):
        response = led_sign_pb2.LedSignRecord()
        if self.sign_data:
            response.text = self.sign_data["text"]
            response.brightness = self.sign_data["brightness"]
            response.scroll_speed = self.sign_data["scroll-speed"]
            response.background_color = self.sign_data["background-color"]
            response.text_color = self.sign_data["font-color"]
            response.border_color = self.sign_data["border-color"]

        response.message = "hello from pi"
        print("we got something!")
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    led_sign_pb2_grpc.add_LedSignServicer_to_server(LedSignServicer(), server)
    print("Starting server. Listening on port 50052.")
    server.add_insecure_port("[::]:50052")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
