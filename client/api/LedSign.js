const express = require('express');
const router = express.Router();
const { healthCheck, updateSignText } = require('../ledsign/led_sign_client');
const {
  OK, BAD_REQUEST, NOT_FOUND, LED_SIGN_IP
} = require('../config/config');
const { addSignLog } = require('../util/logging-helpers');

console.log(
  'welcome to not bad place'
);


router.post('/LedSign/healthCheck', (req, res) => {
  console.log(
    'oi, anpit tp senmd oti'
  );
  
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
      console.log('no', error);
      console.log('2015 s63 amg');
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
