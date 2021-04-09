# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: aws_rekognition.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='aws_rekognition.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x15\x61ws_rekognition.proto\"*\n\x15\x46\x61\x63\x65\x43oordinateRequest\x12\x11\n\tfaceImage\x18\x01 \x01(\x0c\"\xae\x01\n\x16\x46\x61\x63\x65\x43oordinateResponse\x12+\n\x05\x66\x61\x63\x65s\x18\x01 \x03(\x0b\x32\x1c.FaceCoordinateResponse.Face\x12\r\n\x05width\x18\x02 \x01(\x01\x12\x0e\n\x06height\x18\x03 \x01(\x01\x1aH\n\x04\x46\x61\x63\x65\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0b\n\x03tlx\x18\x02 \x01(\x01\x12\x0b\n\x03tly\x18\x03 \x01(\x01\x12\x0b\n\x03\x62rx\x18\x04 \x01(\x01\x12\x0b\n\x03\x62ry\x18\x05 \x01(\x01\x32U\n\tFaceImage\x12H\n\x15RequestFaceCoordinate\x12\x16.FaceCoordinateRequest\x1a\x17.FaceCoordinateResponseb\x06proto3'
)




_FACECOORDINATEREQUEST = _descriptor.Descriptor(
  name='FaceCoordinateRequest',
  full_name='FaceCoordinateRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='faceImage', full_name='FaceCoordinateRequest.faceImage', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=b"",
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=25,
  serialized_end=67,
)


_FACECOORDINATERESPONSE_FACE = _descriptor.Descriptor(
  name='Face',
  full_name='FaceCoordinateResponse.Face',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='FaceCoordinateResponse.Face.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='tlx', full_name='FaceCoordinateResponse.Face.tlx', index=1,
      number=2, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='tly', full_name='FaceCoordinateResponse.Face.tly', index=2,
      number=3, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='brx', full_name='FaceCoordinateResponse.Face.brx', index=3,
      number=4, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='bry', full_name='FaceCoordinateResponse.Face.bry', index=4,
      number=5, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=172,
  serialized_end=244,
)

_FACECOORDINATERESPONSE = _descriptor.Descriptor(
  name='FaceCoordinateResponse',
  full_name='FaceCoordinateResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='faces', full_name='FaceCoordinateResponse.faces', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='width', full_name='FaceCoordinateResponse.width', index=1,
      number=2, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='height', full_name='FaceCoordinateResponse.height', index=2,
      number=3, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_FACECOORDINATERESPONSE_FACE, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=70,
  serialized_end=244,
)

_FACECOORDINATERESPONSE_FACE.containing_type = _FACECOORDINATERESPONSE
_FACECOORDINATERESPONSE.fields_by_name['faces'].message_type = _FACECOORDINATERESPONSE_FACE
DESCRIPTOR.message_types_by_name['FaceCoordinateRequest'] = _FACECOORDINATEREQUEST
DESCRIPTOR.message_types_by_name['FaceCoordinateResponse'] = _FACECOORDINATERESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

FaceCoordinateRequest = _reflection.GeneratedProtocolMessageType('FaceCoordinateRequest', (_message.Message,), {
  'DESCRIPTOR' : _FACECOORDINATEREQUEST,
  '__module__' : 'aws_rekognition_pb2'
  # @@protoc_insertion_point(class_scope:FaceCoordinateRequest)
  })
_sym_db.RegisterMessage(FaceCoordinateRequest)

FaceCoordinateResponse = _reflection.GeneratedProtocolMessageType('FaceCoordinateResponse', (_message.Message,), {

  'Face' : _reflection.GeneratedProtocolMessageType('Face', (_message.Message,), {
    'DESCRIPTOR' : _FACECOORDINATERESPONSE_FACE,
    '__module__' : 'aws_rekognition_pb2'
    # @@protoc_insertion_point(class_scope:FaceCoordinateResponse.Face)
    })
  ,
  'DESCRIPTOR' : _FACECOORDINATERESPONSE,
  '__module__' : 'aws_rekognition_pb2'
  # @@protoc_insertion_point(class_scope:FaceCoordinateResponse)
  })
_sym_db.RegisterMessage(FaceCoordinateResponse)
_sym_db.RegisterMessage(FaceCoordinateResponse.Face)



_FACEIMAGE = _descriptor.ServiceDescriptor(
  name='FaceImage',
  full_name='FaceImage',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=246,
  serialized_end=331,
  methods=[
  _descriptor.MethodDescriptor(
    name='RequestFaceCoordinate',
    full_name='FaceImage.RequestFaceCoordinate',
    index=0,
    containing_service=None,
    input_type=_FACECOORDINATEREQUEST,
    output_type=_FACECOORDINATERESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_FACEIMAGE)

DESCRIPTOR.services_by_name['FaceImage'] = _FACEIMAGE

# @@protoc_insertion_point(module_scope)
