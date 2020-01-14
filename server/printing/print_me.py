import subprocess
import os
import base64


def PrintMe(raw, d="HP-LaserJet-p2015dn", n=1, options={}):
    # raw = base64.b64decode(raw)
    with open("tmp.pdf", "wb") as tmp:
        tmp.write(raw)

    # lp -n 1
    command = "lp -n " + str(n) + " "
    # all options
    for c in options:
        if options[c] == "NA":
            continue
        elif c == options[c]:
            command += "-o " + str(c) + " "
        else:
            command += "-o " + str(c) + "=" + str(options[c]) + " "
    command += "-d " + d + " "
    command += "tmp.pdf"
    print(command)
    os.system(command)
    os.remove("tmp.pdf")
    return "printed"


# # test function
# op = {
#     "sides": "one-sided",
#     "page-ranges": "NA"
# }
# n = 1
# d = "HP-LaserJet-p2015dn"
# raw = ""
# with open("newpdf.txt", "rb") as f:
#     raw = f.read()
# PrintMe(raw=raw, d=d, n=n, options=op)
