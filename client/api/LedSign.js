const express = require('express');
const router = express.Router();
const { healthCheck, updateSignText } = require('../ledsign/led_sign_client');
const { sendPrintRequest } = require('../printing/print_client');
const { send3dPrintRequest } = require('../printing_3d/print_3d_client');
const {
  OK, BAD_REQUEST, NOT_FOUND, LED_SIGN_IP
} = require('../config/config');
const { addSignLog } = require('../util/logging-helpers');

router.post('/LedSign/healthCheck', (req, res) => {
  const { officerName } = req.body;
  healthCheck(officerName, LED_SIGN_IP)
    .then(response => {
      const { message } = response;
      return res.status(OK).send({
        text: message.getText(),
        brightness: message.getBrightness(),
        scrollSpeed: message.getScrollSpeed(),
        backgroundColor: message.getBackgroundColor(),
        textColor: message.getTextColor(),
        borderColor: message.getBorderColor()
      });
    })
    .catch(error => {
      return res.status(NOT_FOUND).send({ ...error });
    });
});

router.post('/LedSign/updateSignText', async (req, res) => {
  if (!await addSignLog(req.body)) {
    return res.sendStatus(BAD_REQUEST);
  }
  updateSignText(req.body, LED_SIGN_IP)
    .then(response => {
      return res.status(OK).send({ ...response });
    })
    .catch(error => {
      return res.status(NOT_FOUND).send({ ...error });
    });
});

module.exports = router;
