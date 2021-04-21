import base64
class encodeFile():
    def encode(self, text):
        encoded_string = ""
        with open(text, "rb") as decoded_file:
            data = decoded_file.read()
            # print(data)
            encoded_string = base64.b64encode(data)
        if encoded_string:
            with open("encodedResume.txt", "wb") as txt:
                txt.write(encoded_string)
        # data = open(text, "rb").read()
        # encoded_string = base64.b64encode(data)
        # txt = open("encodedResume.txt", "wb")
        # txt.write(encoded_string)


