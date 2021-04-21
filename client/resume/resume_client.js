const grpc = require('grpc');
const messages = require('./resume_pb');
const services = require('./resume_grpc_pb');
const contents = require('./resumeContents.json');
const encodeFile = require('./encodeFile.js');

function sendResumeRequest(raw) {
  const client = new services.ResumeClient('localhost:50051',
    grpc.credentials.createInsecure());
  
  const request = new messages.ResumeRequest();
  encode = new encodeFile();
  encode.convert('./resumeContents.json');
  request.setEncodedFile('./encodedFile.txt');
  return new Promise((resolve, reject) => {
    console.log('we out here')
    client.generateResume(request, (err, response) => {
      if(err){
        console.log('ohno')
        reject({message: err, error:true});
      }
      else{
        resolve({message: response, error: false});
      }
    });
  });
}

function main () {
  sendResumeRequest(contents);
}

main();

module.exports = { sendResumeRequest };
