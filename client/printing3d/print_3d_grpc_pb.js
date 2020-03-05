// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var print_3d_pb = require('./print_3d_pb.js');

function serialize_PrintRequest(arg) {
  if (!(arg instanceof print_3d_pb.PrintRequest)) {
    throw new Error('Expected argument of type PrintRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PrintRequest(buffer_arg) {
  return print_3d_pb.PrintRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PrintResponse(arg) {
  if (!(arg instanceof print_3d_pb.PrintResponse)) {
    throw new Error('Expected argument of type PrintResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PrintResponse(buffer_arg) {
  return print_3d_pb.PrintResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var Printer3DService = exports.Printer3DService = {
  print: {
    path: '/Printer3D/Print',
    requestStream: false,
    responseStream: false,
    requestType: print_3d_pb.PrintRequest,
    responseType: print_3d_pb.PrintResponse,
    requestSerialize: serialize_PrintRequest,
    requestDeserialize: deserialize_PrintRequest,
    responseSerialize: serialize_PrintResponse,
    responseDeserialize: deserialize_PrintResponse,
  },
};

exports.Printer3DClient = grpc.makeGenericClientConstructor(Printer3DService);
