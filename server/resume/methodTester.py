from ResumeGenerator import ResumeGenerator
from decodeFile import decodeFile
from encodeFile import encodeFile

def main():
    
    decoder = decodeFile()
    decoder.decode('./encodedFile.txt')
    encoder = encodeFile()
    encoder.encode('./Resume.pdf')

    main()