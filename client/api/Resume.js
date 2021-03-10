const express = require('express');
const router = express.Router();
const { sendResumeRequest } = require('../resume/resume_client');

const {
  OK, BAD_REQUEST, NOT_FOUND
} = require('../config/config');
const { addSignLog } = require('../util/logging-helpers');

router.post('/Resume/sendResumeRequest', (req, res) => {
  sendResumeRequest(req.body)
    .then(response => {
      return res.status(OK).send({ ...response });
    })
    .catch(error => {
      return res.status(BAD_REQUEST).send({ ...error });
    });
});

module.exports = router;
