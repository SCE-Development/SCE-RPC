import grpc
import concurrent
from concurrent import futures

import resume_pb2
import resume_pb2_grpc
import resume_Py

class ResumeServicer(resume_pb2_grpc.ResumeServicer):
    def GenerateResume(self, data):
        print('we got something!!')
        generator = new ResumeGenerator()
        resume = generator.generateResume(data)
        return resume

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    resume_pb2_grpc.add_ResumeServicer_to_server(ResumeServicer(), server)
    print('Server Started. Listening on port 50051')
    server.add_insecure_port('[::]:50051')
    generator = new ResumeGenerator()
    server.start()
    server.wait_for_termination()

main()