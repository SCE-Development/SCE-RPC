const grpc = require('grpc');
const fs = require('fs')
var messages = require('./led_sign_pb');
var services = require('./led_sign_grpc_pb');

function main() {
    let client = new services.LedSignClient('130.65.177.146:50051',
        grpc.credentials.createInsecure());

    let healthCheckRequest = new messages.HealthCheckRequest();
    healthCheckRequest.setOfficerName('officer');
    client.healthCheck(healthCheckRequest, function (err, response) {
        if (err) console.log('sign isnt up!!!!!!!!');
        console.log('Sign response: ', response.getMessage());
    });
    let textRequest = new messages.LedSignRequest();
    textRequest.setText('jerry world');
    textRequest.setBrightness(50);
    textRequest.setScrollSpeed(5);
    textRequest.setBackgroundColor('#000000');
    textRequest.setTextColor('#002200');
    textRequest.setBorderColor('#0000FF');
    client.updateSignText(textRequest, function (err, response) {
        if (err) console.log(err);
        console.log('Message: ', response.getMessage());
    });
}

main()
