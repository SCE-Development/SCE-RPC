const grpc = require('grpc');
const messages = require('./resume_pb');
const services = require('./resume_grpc_pb');
const contents = require('./resumeContents.json');
const encodeFile = require('./encodeFile.js');

function sendResumeRequest(raw) {
  let client = new services.ResumeClient('localhost:50051',
    grpc.credentials.createInsecure());
  let request = new messages.ResumeRequest();
  encode = new encodeFile();
  encode.convert('./resumeContents.json');
  request.setEncodedFile('./newFile.txt');
  return new Promise(function(resolve, reject) {
    client.generateResume(request, function(err, response) {
      if (err || response.getMessage() == 'error') {
        reject({ message: 'Failed to Generate Resume', error: true });
        console.log("error", message);
      }
      resolve({
        message: response && response.getMessage(),
        error: false
      });
    });
  });
}

function main () {
  sendResumeRequest(contents);
}

main();

module.exports = { sendResumeRequest };
