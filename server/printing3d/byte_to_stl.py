import base64

def decodeFile(text):
    docoded_string = ""
    with open(text, "rb") as encoded_file:
        data = encoded_file.read()
        decoded_string = base64.b64decode(data[2:-1])
    with open("decoded.stl","wb") as stl:
        stl.write(decoded_string)

def encodeFile(stl):
    encoded_string = ""
    with open(stl, "rb") as stl_file:
        encoded_string = base64.b64encode(stl_file.read())
    print(encoded_string)
    with open("newstl.txt", "w") as rawbytes:
        rawbytes.write(str(encoded_string))