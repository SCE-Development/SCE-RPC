import base64
class decodeFile():
    def decode(self, text):
        decoded_string = ""
        with open(text, "rb") as encoded_file:
            data = encoded_file.read()
            decoded_string = base64.b64decode(data)
        if decoded_string:
            with open("decoded.json", "wb") as json:
                json.write(decoded_string)
