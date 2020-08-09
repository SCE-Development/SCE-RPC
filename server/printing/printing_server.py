import grpc
from concurrent import futures
import logging
import os

import print_pb2
import print_pb2_grpc
from SCEPrinterMock import SCEPrinterMock


class PrintServicer(print_pb2_grpc.PrinterServicer):
    # (left printer, right printer)
    pages = 0
    printer = ""
    printer_mock = SCEPrinterMock()

    def DeterminePrinterForJob(self, copies):
        if self.pages > 0:
            self.pages += copies
            self.printer_mock.add_right_printer_copies(copies)
            self.printer_mock.create_visual()
            return "HP-LaserJet-p2015dn-right"
        else:
            self.pages -= copies
            self.printer_mock.add_left_printer_copies(copies)
            self.printer_mock.create_visual()
            return "HP-LaserJet-p2015dn-left"

    def SendRequestToPrinter(self, encoded_file, copies=1, options={}):
        with open("tmp.pdf", "wb") as tmp:
            tmp.write(encoded_file)

        command = "lp -n " + str(copies) + " "
        # all options
        for current_option in options:
            if options[current_option] == "NA":
                continue
            elif current_option == options[current_option]:
                command += "-o " + str(current_option) + " "
            else:
                command += (
                    "-o "
                    + str(current_option)
                    + "="
                    + str(options[current_option])
                    + " "
                )
        chosenPrinter = self.DeterminePrinterForJob(copies)
        command += "-d " + chosenPrinter + " "
        command += "tmp.pdf"
        status = True
        status = os.popen(command)
        os.remove("tmp.pdf")
        self.printer = self.DeterminePrinterForJob(copies)

        return chosenPrinter if status else "error"

    def PrintPage(self, request, context):
        response = print_pb2.PrintResponse()
        response.message = self.SendRequestToPrinter(
            encoded_file=request.encoded_file,
            copies=request.copies,
            options=request.options,
        )
        return response

    def HealthCheck(self, request, context):
        response = print_pb2.PrinterHealthStatus()
        response.message = "Hello from health-check!"
        print("Here is the printer health status!")
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print_pb2_grpc.add_PrinterServicer_to_server(PrintServicer(), server)
    print("Starting server. Listening on port 50051.")
    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
