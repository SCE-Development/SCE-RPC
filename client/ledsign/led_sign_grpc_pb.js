// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var led_sign_pb = require('./led_sign_pb.js');

function serialize_HealthCheckRequest(arg) {
  if (!(arg instanceof led_sign_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type HealthCheckRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_HealthCheckRequest(buffer_arg) {
  return led_sign_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_HealthCheckResponse(arg) {
  if (!(arg instanceof led_sign_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type HealthCheckResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_HealthCheckResponse(buffer_arg) {
  return led_sign_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
    requestType: led_sign_pb.HealthCheckRequest,
    responseType: led_sign_pb.HealthCheckResponse,
    requestSerialize: serialize_HealthCheckRequest,
    requestDeserialize: deserialize_HealthCheckRequest,
    responseSerialize: serialize_HealthCheckResponse,
    responseDeserialize: deserialize_HealthCheckResponse,
  },
  updateSignText: {
    path: '/LedSign/UpdateSignText',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignRequest,
    responseType: led_sign_pb.LedSignResponse,
    requestSerialize: serialize_LedSignRequest,
    requestDeserialize: deserialize_LedSignRequest,
    responseSerialize: serialize_LedSignResponse,
    responseDeserialize: deserialize_LedSignResponse,
  },
};

exports.LedSignClient = grpc.makeGenericClientConstructor(LedSignService);
