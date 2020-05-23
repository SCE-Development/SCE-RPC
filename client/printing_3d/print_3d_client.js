const grpc = require('grpc');
var messages = require('./print_3d_pb');
var services = require('./print_3d_grpc_pb');

function send3dPrintRequest(raw, name, volume, copies) {
    let client = new services.Printer3dClient('localhost:50051',
        grpc.credentials.createInsecure());
    let request = new messages.Print3dRequest();
    request.setCopies(copies);
    request.setMemberName(name);
    request.setEncodedFile(raw);
    request.setPrintVolumeCubicCm(volume);
    client.handle3dPrint(request, function (err, response) {
        if (err) console.log(err);
        console.log('Message:', response.getMessage());
    });
}
send3dPrintRequest(null, "lawrence", 13, 2);

module.exports = { send3dPrintRequest }
