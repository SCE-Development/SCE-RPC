const grpc = require('grpc');
const messages = require('./aws_rekognition_pb');
const services = require('./aws_rekognition_grpc_pb');

function detectFace(faceImageBytes) {
  const client = new services.FaceImageClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  const faceCoordinateRequest = new messages.FaceCoordinateRequest();
  faceCoordinateRequest.setFaceimage(faceImageBytes);
  return new Promise((resolve, reject) => {
    client.requestFaceCoordinate(faceCoordinateRequest, (err, response) => {
      if (err || !response) {
        reject({ message: err, error: true });
      } else {
        resolve({ message: response, error: false });
      }
    });
  });
}

module.exports = { detectFace };
