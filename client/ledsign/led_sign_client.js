const grpc = require('grpc');
const messages = require('./led_sign_pb');
const services = require('./led_sign_grpc_pb');

/**
 * This function checks if the LED Sign is up and running. If the sign is up,
 * we should get a response back containing "hello <officerName>!". If not, we
 * return an object that the sign is down.
 * @param {string} officerName The name of the officer interacting with the sign
 * @param {string} signIp - The IP address of the sign.
 * @returns {Promise} Promise object which will contain the message from the
 * sign and if an error occurred.
 */
function healthCheck(officerName, signIp) {
  const client = new services.LedSignClient(
    `${signIp}:50052`,
    grpc.credentials.createInsecure()
  );
  const healthCheckRequest = new messages.LedSignMessage();
  healthCheckRequest.setMessage(officerName);
  return new Promise(function(resolve, reject) {
    client.healthCheck(healthCheckRequest, function(err, response) {
      if (err || !response) {
        reject({ message: 'Sign is down', error: true });
      } else {
        resolve({ message: response, error: false });
      }
    });
  });
}

/**
 * This function deletes a certain message from the array of messages
 * being displayed on the sign.
 * @param {string} deleteIndex Index of the message you want to delete
 * @param {string} signIp - The IP address of the sign.
 * @returns {Promise} Promise object which will contain the message from the
 * sign and if an error occurred.
 */
function deleteMessageFromQueue(deleteMessage, signIp) {
  const client = new services.LedSignClient(
    `${signIp}:50052`,
    grpc.credentials.createInsecure()
  );
  const deleteMessageRequest = new messages.LedSignMessage();
  deleteMessageRequest.setMessage(deleteMessage);
  return new Promise(function(resolve, reject) {
    client.deleteMessageFromQueue(deleteMessageRequest, function(err, response) {
      if (err || !response) {
        reject({ message: 'Sign is down', error: true });
      } else {
        resolve({ message: response, error: false });
      }
    });
  });
}

/**
 * This function updates the text of the sign in the SCE club room.
 * @param {Object} signData An object containing all of the information to
 * update the sign with.
 * @param {(string|undefined)} signData.text - The text to display on the sign
 * @param {string} signData.brightness - The brightness of the sign
 * @param {string} signData.scrollSpeed - How fast the text will scroll across
 * the sign
 * @param {string} signData.backgroundColor - The background color the text
 * will scroll over represented in hex color value.
 * @param {string} signData.textColor - The color of the text to display
 * represented in hex color value.
 * @param {(string|undefined)} signData.borderColor - The color displayed at
 * the edge of the sign represneted in hex color value.
 * @param {string} signIp - The IP address of the sign.
 * @returns {Promise} Promise object which will contain the message from the
 * sign and if an error occurred.
 */
function addMessageToQueue(signData, signIp) {
  const client = new services.LedSignClient(
    `${signIp}:50052`,
    grpc.credentials.createInsecure()
  );
  const textRequest = new messages.LedSignRecord();
  textRequest.setText(signData.text);
  textRequest.setBrightness(signData.brightness);
  textRequest.setScrollSpeed(signData.scrollSpeed);
  textRequest.setBackgroundColor(signData.backgroundColor);
  textRequest.setTextColor(signData.textColor);
  textRequest.setBorderColor(signData.borderColor);
  return new Promise(function(resolve, reject) {
    client.addMessageToQueue(textRequest, function(err, response) {
      if (err) reject({ message: 'Update failed', error: true });
      resolve({ message: response, error: false });
    });
  });
}

/**
 * This function clears the queue of messages to be displayed on the LED sign.
 * @param {Object} signMessage - An object containing the desired message to be
 * removed from the queue.
 * @param {string} signIp - The IP address of the sign.
 * @returns {Promise} Promise object which will contain the message from the
 * sign and if an error occurred.
 */
function clearMessageQueue(signMessage, signIp) {
  const client = new services.LedSignClient(
    `${signIp}:50052`,
    grpc.credentials.createInsecure()
  );
  const clearMessageRequest = new messages.LedSignMessage();
  clearMessageRequest.setMessage(signMessage);
  return new Promise(function(resolve, reject) {
    client.clearMessageQueue(clearMessageRequest, function(err, response) {
      if (err) reject({ message: 'Message queue not cleared', error: true });
      resolve({ message: response, error: false });
    });
  });
}

module.exports = {
  healthCheck,
  addMessageToQueue,
  clearMessageQueue,
  deleteMessageFromQueue
};
