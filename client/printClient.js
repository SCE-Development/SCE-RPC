const grpc = require('grpc');
const fs = require('fs')
var messages = require('./print_pb');
var services = require('./print_grpc_pb');
const printOptions = {
    'sides': 'one-sided',
    'page-ranges': 'NA'
};

function main() {
    let contents = fs.readFileSync(__dirname + '/../sample.pdf', 'base64');
    let client = new services.PrinterClient('localhost:50051',
        grpc.credentials.createInsecure());
    let request = new messages.PrintRequest();
    request.setCopies(1);
    request.setDestination('HP-LaserJet-p2015dn');
    request.setEncodedFile(contents);
    for (let key in printOptions) {
        request.getOptionsMap().set(key, printOptions[key]);
    }
    client.printPage(request, function (err, response) {
        if (err) console.log(err);
        console.log('Message: ', response.getMessage());
    });
}

main()