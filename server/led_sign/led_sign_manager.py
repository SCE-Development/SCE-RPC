import os
from os import sep

from sign_message import SignMessage

class SceLedSignManager:
    sign_data = {}

    def write_message_to_sign(self, message):
        CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__)) + sep
        self.current_message = SignMessage(message)

        command = [
                CURRENT_DIRECTORY + "sce_sign.exe",
                "--set-text", message.text,
                "--set-brightness", str(message.brightness) + "%",
                "--set-speed", str(message.scroll_speed) + " px/vsync",
                "--set-background-color", message.background_color[1:],
                "--set-font-color", message.text_color[1:],
                "--set-border-color", message.border_color[1:],
                "--set-font-filename", CURRENT_DIRECTORY + "fonts/9x18B.bdf",
            ]
        print(command)
        self.sign_data["text"] = message.text
        self.sign_data["brightness"] = message.brightness
        self.sign_data["scroll-speed"] = message.scroll_speed
        self.sign_data["background-color"] = message.background_color
        self.sign_data["font-color"] = message.text_color
        self.sign_data["border-color"] = message.border_color

        pass

    def get_current_sign_message(self):
        return self.current_message
