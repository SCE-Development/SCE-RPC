// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var print_3d_pb = require('./print_3d_pb.js');

function serialize_Print3dRequest(arg) {
  if (!(arg instanceof print_3d_pb.Print3dRequest)) {
    throw new Error('Expected argument of type Print3dRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Print3dRequest(buffer_arg) {
  return print_3d_pb.Print3dRequest.deserializeBinary(new Uint8Array(buffer_arg)
}

function serialize_Print3dResponse(arg) {
  if (!(arg instanceof print_3d_pb.Print3dResponse)) {
    throw new Error('Expected argument of type Print3dResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Print3dResponse(buffer_arg) {
  return print_3d_pb.Print3dResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var Printer3dService = exports.Printer3dService = {
  handle3dPrint: {
    path: '/Printer3d/Handle3dPrint',
    requestStream: false,
    responseStream: false,
    requestType: print_3d_pb.Print3dRequest,
    responseType: print_3d_pb.Print3dResponse,
    requestSerialize: serialize_Print3dRequest,
    requestDeserialize: deserialize_Print3dRequest,
    responseSerialize: serialize_Print3dResponse,
    responseDeserialize: deserialize_Print3dResponse,
  },
};

exports.Printer3dClient = grpc.makeGenericClientConstructor(Printer3dService);
