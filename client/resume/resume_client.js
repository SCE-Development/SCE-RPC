const grpc = require('grpc');
const messages = require('./resume_pb');
const services = require('./resume_grpc_pb');

function sendResumeRequest(raw) {
    let client = new services.ResumeClient('localhost:50051',
      grpc.credentials.createInsecure());
    let request = new messages.ResumeRequest();
    request.setEncodedFile(raw);

    return new Promise(function(resolve, reject) {
      client.GenerateResume(request, function(err, response) {
        if (err || response.getMessage() == 'error') {
          reject({ message: 'Failed to Generate Resume', error: true });
        }
        resolve({
          message: response && response.getMessage(),
          error: false
        });
      });
    });
  }
  
  module.exports = { sendResumeRequest };

// function main() {
//     const client = new services.ResumeClient(
//         'localhost:50051', grpc.credentials.createInsecure()
//     );

//     const resumeRequest = new messages.ResumeRequest();
//     resumeRequest.setEncodedFile('this is my resume');

//     client.generateResume(resumeRequest, function (err, response) {
//         if (err) {
//             console.log('this thing broke!', err);
//         } else {
//             console.log('response from python:', response.getMessage());
//         }
//     })
// }

// main();