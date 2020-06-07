const { SceRpcApiServer } = require('../../client/api/SceRpcApiServer');

let serverInstance = null;

function emptySchema(schema) {
  schema.deleteMany({}, err => {
    if (err) {
      //
    }
  });
}

function initializeServer(pathToApi, port = 7999) {
  serverInstance = new SceRpcApiServer(pathToApi, port, '/SceRpcApi/');
  serverInstance.initializeEndpoints();
  serverInstance.openConnection();
  return serverInstance.getServerInstance();
}

function terminateServer() {
  serverInstance.closeConnection();
}

// Exporting functions
module.exports = {
  emptySchema,
  initializeServer,
  terminateServer
};
