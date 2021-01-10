// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var aws_rekognition_pb = require('./aws_rekognition_pb.js');

function serialize_FaceCoordinateRequest(arg) {
  if (!(arg instanceof aws_rekognition_pb.FaceCoordinateRequest)) {
    throw new Error('Expected argument of type FaceCoordinateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FaceCoordinateRequest(buffer_arg) {
  return aws_rekognition_pb.FaceCoordinateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_FaceCoordinateResponse(arg) {
  if (!(arg instanceof aws_rekognition_pb.FaceCoordinateResponse)) {
    throw new Error('Expected argument of type FaceCoordinateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FaceCoordinateResponse(buffer_arg) {
  return aws_rekognition_pb.FaceCoordinateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FaceImageService = exports.FaceImageService = {
  requestFaceCoordinate: {
    path: '/FaceImage/RequestFaceCoordinate',
    requestStream: false,
    responseStream: false,
    requestType: aws_rekognition_pb.FaceCoordinateRequest,
    responseType: aws_rekognition_pb.FaceCoordinateResponse,
    requestSerialize: serialize_FaceCoordinateRequest,
    requestDeserialize: deserialize_FaceCoordinateRequest,
    responseSerialize: serialize_FaceCoordinateResponse,
    responseDeserialize: deserialize_FaceCoordinateResponse,
  },
};

exports.FaceImageClient = grpc.makeGenericClientConstructor(FaceImageService);
