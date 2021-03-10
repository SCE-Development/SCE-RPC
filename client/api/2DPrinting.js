const express = require('express');
const router = express.Router();
const { healthCheck, sendPrintRequest } = require('../printing/print_client');
const {
  OK, BAD_REQUEST, NOT_FOUND
} = require('../config/config');
const { addSignLog } = require('../util/logging-helpers');

router.post('/Printer/healthCheck', (req, res) => {
  healthCheck()
    .then(response => {
      return res.status(OK).send({ ...response });
    })
    .catch(error => {
      return res.status(NOT_FOUND).send({ ...error });
    });
});

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
