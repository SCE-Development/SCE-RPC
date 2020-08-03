// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var resume_pb = require('./resume_pb.js');

function serialize_ResumeRequest(arg) {
  if (!(arg instanceof resume_pb.ResumeRequest)) {
    throw new Error('Expected argument of type ResumeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ResumeRequest(buffer_arg) {
  return resume_pb.ResumeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ResumeResponse(arg) {
  if (!(arg instanceof resume_pb.ResumeResponse)) {
    throw new Error('Expected argument of type ResumeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ResumeResponse(buffer_arg) {
  return resume_pb.ResumeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ResumeService = exports.ResumeService = {
  generateResume: {
    path: '/Resume/GenerateResume',
    requestStream: false,
    responseStream: false,
    requestType: resume_pb.ResumeRequest,
    responseType: resume_pb.ResumeResponse,
    requestSerialize: serialize_ResumeRequest,
    requestDeserialize: deserialize_ResumeRequest,
    responseSerialize: serialize_ResumeResponse,
    responseDeserialize: deserialize_ResumeResponse,
  },
};

exports.ResumeClient = grpc.makeGenericClientConstructor(ResumeService);
