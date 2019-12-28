import subprocess
import os

# command = "ls"
# os.system(command)


def printMe(pdf, d="HP-LaserJet-p2015dn", n=1, options={}):
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
    command += str(pdf)
    print(command)
    os.system(command)
    return "printed"


# test function
# op = {
#     "sides": "one-sided",
#     "page-ranges": "NA"
# }
# n = 1
# d = "HP-LaserJet-p2015dn"
# printMe(pdf="sample.pdf", d=d, n=n, options=op)
