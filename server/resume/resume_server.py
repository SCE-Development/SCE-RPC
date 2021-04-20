import grpc
import concurrent
from concurrent import futures
from ResumeGenerator import ResumeGenerator
import resume_pb2
import resume_pb2_grpc
from decodeFile import decodeFile
from encodeFile import encodeFile

class ResumeServicer(resume_pb2_grpc.ResumeServicer):
    generator = ResumeGenerator()
    decoder = decodeFile()
    encoder = encodeFile()
    def GenerateResume(self, data):
        print('we got something!!')
        # decoder.decodeFile('./encodedFile.txt')
        # encoder.encodeFile('./Resume.pdf')
        # resume = generator.generateResume(data)
        # return resume

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    resume_pb2_grpc.add_ResumeServicer_to_server(ResumeServicer(), server)
    print('Server Started. Listening on port 50051')
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

main()
