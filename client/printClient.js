const PROTO_PATH = __dirname + '/../proto/print.proto';
const grpc = require('grpc');
const fs = require('fs')
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const print_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
    let contents = fs.readFileSync(__dirname + '/../JerryLeeResume.pdf', 'base64')
    let client = new print_proto.Printer('localhost:50051',
        grpc.credentials.createInsecure());
    client.PrintPage({
        copies: 1, destination: "HP-LaserJet-p2015dn", options: {
            "sides": "one-sided",
            "page-ranges": "NA"
        }, enc: contents,
    }, function (err, response) {
        if (err) console.log(err);
        console.log('Message:', response.message);
    });
}

main()