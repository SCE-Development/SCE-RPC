var PROTO_PATH = __dirname + '/print.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
    var client = new hello_proto.Printer('localhost:50051',
        grpc.credentials.createInsecure());
    client.PrintPage({
        copies: 1, destination: "HP-LaserJet-p2015dn", options: {
            "sides": "one-sided",
            "page-ranges": "NA"
        }
    }, function (err, response) {
        if (err) console.log(err);
        console.log('Message:', response.message);
    });
}

main()