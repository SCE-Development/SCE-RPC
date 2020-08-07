// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var led_sign_pb = require('./led_sign_pb.js');

function serialize_HealthCheckResponse(arg) {
  if (!(arg instanceof led_sign_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type HealthCheckResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_HealthCheckResponse(buffer_arg) {
  return led_sign_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LedSignMessage(arg) {
  if (!(arg instanceof led_sign_pb.LedSignMessage)) {
    throw new Error('Expected argument of type LedSignMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LedSignMessage(buffer_arg) {
  return led_sign_pb.LedSignMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LedSignRecord(arg) {
  if (!(arg instanceof led_sign_pb.LedSignRecord)) {
    throw new Error('Expected argument of type LedSignRecord');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LedSignRecord(buffer_arg) {
  return led_sign_pb.LedSignRecord.deserializeBinary(new Uint8Array(buffer_arg));
}


var LedSignService = exports.LedSignService = {
  healthCheck: {
    path: '/LedSign/HealthCheck',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignMessage,
    responseType: led_sign_pb.HealthCheckResponse,
    requestSerialize: serialize_LedSignMessage,
    requestDeserialize: deserialize_LedSignMessage,
    responseSerialize: serialize_HealthCheckResponse,
    responseDeserialize: deserialize_HealthCheckResponse,
  },
  addMessageToQueue: {
    path: '/LedSign/AddMessageToQueue',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignRecord,
    responseType: led_sign_pb.LedSignMessage,
    requestSerialize: serialize_LedSignRecord,
    requestDeserialize: deserialize_LedSignRecord,
    responseSerialize: serialize_LedSignMessage,
    responseDeserialize: deserialize_LedSignMessage,
  },
  clearMessageQueue: {
    path: '/LedSign/ClearMessageQueue',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignMessage,
    responseType: led_sign_pb.LedSignMessage,
    requestSerialize: serialize_LedSignMessage,
    requestDeserialize: deserialize_LedSignMessage,
    responseSerialize: serialize_LedSignMessage,
    responseDeserialize: deserialize_LedSignMessage,
  },
  deleteMessageFromQueue: {
    path: '/LedSign/DeleteMessageFromQueue',
    requestStream: false,
    responseStream: false,
    requestType: led_sign_pb.LedSignMessage,
    responseType: led_sign_pb.LedSignMessage,
    requestSerialize: serialize_LedSignMessage,
    requestDeserialize: deserialize_LedSignMessage,
    responseSerialize: serialize_LedSignMessage,
    responseDeserialize: deserialize_LedSignMessage,
  },
};

exports.LedSignClient = grpc.makeGenericClientConstructor(LedSignService);
