const express = require('express');
const router = express.Router();
const { detectFace } = require('../aws_rekognition/aws_rekognition_client');
const { OK, BAD_REQUEST, NOT_FOUND } = require('../config/config');
const { addSignLog } = require('../util/logging-helpers');

router.post('/AWS_rekognition', (req, res) => {
  const { base64bytes } = req.body;
  // const base64bytes = getBase64Image(faceImage);
  // detectFace(faceImage)
  detectFace(base64bytes)
    .then((response) => {
      return res.status(OK).send({ ...response });
    })
    .catch((error) => {
      return res.status(BAD_REQUEST).send({ ...error });
    });
});

// function getBase64Image(img) {
//   let canvas = document.createElement('canvas');
//   canvas.width = img.width;
//   canvas.height = img.height;
//   let ctx = canvas.getContext('2d');
//   ctx.drawImage(img, 0, 0);

//   let dataURL = canvas.toDataURL('image/png');

//   return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
// }

module.exports = router;
