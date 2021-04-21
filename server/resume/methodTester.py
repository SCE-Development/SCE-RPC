from ResumeGenerator import ResumeGenerator
from decodeFile import decodeFile
from encodeFile import encodeFile

def main():
    generator = ResumeGenerator()
    generator.generateResume('./encodedFile.txt')
    encoder = encodeFile()
    encoder.encode('./Resume.pdf')

main()