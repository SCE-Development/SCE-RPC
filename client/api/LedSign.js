const express = require('express');
const router = express.Router();
const {
  healthCheck, updateSignText,
  addMessageToQueue, clearMessageQueue
} = require('../ledsign/led_sign_client');
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

router.post('/LedSign/addMessageToQueue', (req, res) => {
  addMessageToQueue(req.body, LED_SIGN_IP)
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

router.post('/LedSign/clearMessageQueue', (req, res) => {
  clearMessageQueue(req.body, LED_SIGN_IP)
    .then(response => {
      return res.status(OK).send({ ...response });
    })
    .catch(error => {
      return res.status(NOT_FOUND).send({ ...error });
    });
});

router.get('/LedSign/getSignMessages', (req, res) => {
  const fakeMessages = [
    {
      text: 'Big Oof',
      brightness: 50,
      scrollSpeed: 50,
      backgroundColor: '#00FF00',
      textColor: '#FF0000',
      borderColor: '#0000FF'
    },
    {
      text: 'kzv',
      brightness: 50,
      scrollSpeed: 50,
      backgroundColor: '#00FF00',
      textColor: '#FF0000',
      borderColor: '#0000FF'
    },
    {
      text: 'shoutout taline taline rules',
      brightness: 50,
      scrollSpeed: 50,
      backgroundColor: '#00FF00',
      textColor: '#FF0000',
      borderColor: '#0000FF'
    }
  ];
  return res.status(OK).send(fakeMessages);
});

module.exports = router;
