const grpc = require('grpc');
const messages = require('./print_3d_pb');
const services = require('./print_3d_grpc_pb');

function send3dPrintRequest(raw, name, volume, copies) {
  let client = new services.Printer3dClient('localhost:50053',
    grpc.credentials.createInsecure());
  let request = new messages.Print3dRequest();
  request.setCopies(copies);
  request.setMemberName(name);
  request.setEncodedFile(raw);
  request.setPrintVolumeCubicCm(volume);
  client.handle3dPrint(request, function(err, response) {
    if (err) console.log(err);
    console.log('Message:', response.getMessage());
  });
}

module.exports = { send3dPrintRequest };
