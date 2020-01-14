import base64


def decodeFile(text):
    decoded_string = ""
    with open(text, "rb") as encoded_file:
        data = encoded_file.read()
        decoded_string = base64.b64decode(data[2:-1])
    with open("decoded.pdf", "wb") as pdf:
        pdf.write(decoded_string)


def encodeFile(pdf):
    encoded_string = ""
    with open(pdf, "rb") as pdf_file:
        encoded_string = base64.b64encode(pdf_file.read())
    print(encoded_string)
    with open("newpdf.txt", "w") as rawbytes:
        rawbytes.write(str(encoded_string))


# encodeFile("../JerryLeeResume.pdf")
# decodeFile("newpdf.txt")
