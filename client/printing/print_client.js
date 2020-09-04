const grpc = require('grpc');
const fs = require('fs');
const messages = require('./print_pb');
const services = require('./print_grpc_pb');

function healthCheck() {
  const client = new services.PrinterClient(
    'localhost:50051', grpc.credentials.createInsecure()
  );
  const healthCheckRequest = new messages.PrintRequest();
  return new Promise(function(resolve, reject) {
    client.healthCheck(healthCheckRequest, function(err, response) {
      if (err || !response) {
        reject({ message: 'Printer is down', error: true });
      } else {
        resolve({ message: response, error: false });
      }
    });
  });
}

function sendPrintRequest(raw, copies, sides, pageRanges, destination='') {
  printOptions = {
    'sides': sides,
    'page-ranges': pageRanges
  };
  let client = new services.PrinterClient('localhost:50051',
    grpc.credentials.createInsecure());
  let request = new messages.PrintRequest();
  request.setCopies(copies);
  request.setDestination(destination);
  request.setEncodedFile(raw);
  for (let key in printOptions) {
    request.getOptionsMap().set(key, printOptions[key]);
  }
  return new Promise(function(resolve, reject) {
    client.printPage(request, function(err, response) {
      if (err || response.getMessage() == 'error') {
        reject({ message: 'Failed to print', error: true });
      }
      resolve({
        message: response && response.getMessage(),
        error: false
      });
    });
  });
}

module.exports = { sendPrintRequest, healthCheck };
