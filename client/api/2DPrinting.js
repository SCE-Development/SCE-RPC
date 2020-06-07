const express = require('express');
const router = express.Router();
const { healthCheck, updateSignText } = require('../ledsign/led_sign_client');
const { sendPrintRequest } = require('../printing/print_client');
const { send3dPrintRequest } = require('../printing_3d/print_3d_client');
const {
  OK, BAD_REQUEST, NOT_FOUND, LED_SIGN_IP
} = require('../config/config');
const { addSignLog } = require('../util/logging-helpers');

router.post('/Printer/sendPrintRequest', (req, res) => {
  const { raw, copies, sides, pageRanges, destination } = req.body;
  sendPrintRequest(raw, copies, sides, pageRanges, destination)
    .then(response => {
      return res.status(OK).send({ ...response });
    })
    .catch(error => {
      return res.status(BAD_REQUEST).send({ ...error });
    });
});

module.exports = router;
