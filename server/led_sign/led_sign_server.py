import grpc
import logging
from concurrent import futures

import led_sign_pb2
import led_sign_pb2_grpc
import subprocess
import os
from os import sep

import threading
import time

from sign_message import SignMessage


class LedSignServicer(led_sign_pb2_grpc.LedSignServicer):
    CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + sep
    proc = None
    message_queue = []
    commmand = []

    def WriteCommandToSign(self):
        index = 0
        while True:
            if len(self.message_queue):
                # This if statement checks whether or not the sign should be
                # updated. If the queue has more than one message or if a
                # message exists and the sign is blank, we should update.
                if len(self.message_queue) != 1 or self.proc == None:
                    current_msg = self.message_queue[index]
                    self.command = [
                            self.CURRENT_DIRECTORY + "sce_sign.exe",
                            "--set-text", current_msg.text,
                            "--set-brightness", str(current_msg.brightness) + "%",
                            "--set-speed", str(current_msg.scroll_speed) + " px/vsync",
                            "--set-background-color", current_msg.background_color[1:],
                            "--set-font-color", current_msg.text_color[1:],
                            "--set-border-color", current_msg.border_color[1:],
                            "--set-font-filename", self.CURRENT_DIRECTORY + 
                            "fonts/9x18B.bdf",
                        ]
                    print(self.command)
                    
                    if self.proc != None:
                        self.proc.kill()
                    self.proc = subprocess.Popen(self.command)
                index = (index+1)%len(self.message_queue)
            else:
                if self.proc != None:
                    self.proc.kill()
                index = 0
            time.sleep(3)
        
    def ClearMessageQueue(self):
        self.message_queue.clear()
        print(self.message_queue)
        response = led_sign_pb2.LedSignMessage()
        response.message = 'queue was cleared!'
        return response

    def AddMessageToQueue(self, request, context):
        response = led_sign_pb2.LedSignRecord()
        msg = SignMessage(request)
        self.message_queue.append(msg)
        print('we got something!')
        print(self.message_queue)
        return response

    def HealthCheck(self, request, context):  
        records = []
        for msg in self.message_queue:
            led_sign_record = led_sign_pb2.LedSignRecord()
            led_sign_record.text = msg.text
            led_sign_record.brightness = msg.brightness
            led_sign_record.scroll_speed = msg.scroll_speed
            led_sign_record.background_color = msg.background_color
            led_sign_record.text_color = msg.text_color
            led_sign_record.border_color = msg.border_color
            records.append(led_sign_record)
        response = led_sign_pb2.HealthCheckResponse(
            messages=records
        )
        print(response)
        print('we got something!')
        return response
    
    def DeleteMessageFromQueue(self, request, context):
        response = led_sign_pb2.LedSignMessage()
        response.message = 'deleted'
        if self.command[2] == request.message and self.proc != None:
            self.proc.kill()
        self.message_queue = [elem for elem in self.message_queue if elem.text != request.message]
        print('it has been deleted', self.message_queue)
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    servicer = LedSignServicer()
    led_sign_pb2_grpc.add_LedSignServicer_to_server(servicer, server)
    print('Starting server. Listening on port 50052.')
    write_sign_thread = threading.Thread(target=servicer.WriteCommandToSign)
    write_sign_thread.start()
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    logging.basicConfig()
    serve()
