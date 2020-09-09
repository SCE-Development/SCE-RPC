// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var print_pb = require('./print_pb.js');

function serialize_PrintRequest(arg) {
  if (!(arg instanceof print_pb.PrintRequest)) {
    throw new Error('Expected argument of type PrintRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PrintRequest(buffer_arg) {
  return print_pb.PrintRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PrintResponse(arg) {
  if (!(arg instanceof print_pb.PrintResponse)) {
    throw new Error('Expected argument of type PrintResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PrintResponse(buffer_arg) {
  return print_pb.PrintResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PrinterHealthCheckUpRequest(arg) {
  if (!(arg instanceof print_pb.PrinterHealthCheckUpRequest)) {
    throw new Error('Expected argument of type PrinterHealthCheckUpRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PrinterHealthCheckUpRequest(buffer_arg) {
  return print_pb.PrinterHealthCheckUpRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PrinterHealthStatus(arg) {
  if (!(arg instanceof print_pb.PrinterHealthStatus)) {
    throw new Error('Expected argument of type PrinterHealthStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PrinterHealthStatus(buffer_arg) {
  return print_pb.PrinterHealthStatus.deserializeBinary(new Uint8Array(buffer_arg));
}


var PrinterService = exports.PrinterService = {
  printPage: {
    path: '/Printer/PrintPage',
    requestStream: false,
    responseStream: false,
    requestType: print_pb.PrintRequest,
    responseType: print_pb.PrintResponse,
    requestSerialize: serialize_PrintRequest,
    requestDeserialize: deserialize_PrintRequest,
    responseSerialize: serialize_PrintResponse,
    responseDeserialize: deserialize_PrintResponse,
  },
  healthCheck: {
    path: '/Printer/HealthCheck',
    requestStream: false,
    responseStream: false,
    requestType: print_pb.PrinterHealthCheckUpRequest,
    responseType: print_pb.PrinterHealthStatus,
    requestSerialize: serialize_PrinterHealthCheckUpRequest,
    requestDeserialize: deserialize_PrinterHealthCheckUpRequest,
    responseSerialize: serialize_PrinterHealthStatus,
    responseDeserialize: deserialize_PrinterHealthStatus,
  },
};

exports.PrinterClient = grpc.makeGenericClientConstructor(PrinterService);
