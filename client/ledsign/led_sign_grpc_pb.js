// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var led_sign_pb = require('./led_sign_pb.js');

function serialize_LedSignRecord(arg) {
  if (!(arg instanceof led_sign_pb.LedSignRecord)) {
    throw new Error('Expected argument of type LedSignRecord');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LedSignRecord(buffer_arg) {
  return led_sign_pb.LedSignRecord.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LedSignRequest(arg) {
  if (!(arg instanceof led_sign_pb.LedSignRequest)) {
    throw new Error('Expected argument of type LedSignRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LedSignRequest(buffer_arg) {
  return led_sign_pb.LedSignRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LedSignResponse(arg) {
  if (!(arg instanceof led_sign_pb.LedSignResponse)) {
    throw new Error('Expected argument of type LedSignResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LedSignResponse(buffer_arg) {
  return led_sign_pb.LedSignResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LedSignService = exports.LedSignService = {
  healthCheck: {
    path: '/LedSign/HealthCheck',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignRequest,
    responseType: led_sign_pb.LedSignRecord,
    requestSerialize: serialize_LedSignRequest,
    requestDeserialize: deserialize_LedSignRequest,
    responseSerialize: serialize_LedSignRecord,
    responseDeserialize: deserialize_LedSignRecord,
  },
  updateSignText: {
    path: '/LedSign/UpdateSignText',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignRecord,
    responseType: led_sign_pb.LedSignResponse,
    requestSerialize: serialize_LedSignRecord,
    requestDeserialize: deserialize_LedSignRecord,
    responseSerialize: serialize_LedSignResponse,
    responseDeserialize: deserialize_LedSignResponse,
  },
};

exports.LedSignClient = grpc.makeGenericClientConstructor(LedSignService);
