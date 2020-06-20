const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

/**
 * Class responsible for resolving paths of API endpoints and combining them
 * them into an express server.
 */
class SceRpcApiServer {
  /**
   * Store port information, create express server object and configure
   * BodyParser options.
   * @param {(String|Array<String>)} pathToEndpoints The path to a single
   * server file, directory or array of directories/files;
   * @param {Number} port The port for the server to listen on.
   * @param {String} prefix The prefix of the api endpoints to send requests
   * to, e.g. /api/Event/addEvent, with /api/ being the prefix.
   */
  constructor(pathToEndpoints, port, prefix = '/api/') {
    this.runningInProduction = process.env.NODE_ENV === 'production';
    this.port = port;
    this.pathToEndpoints = pathToEndpoints;
    this.prefix = prefix;
    this.app = express();

    this.app.use(cors());
    this.app.use(
      bodyParser.json({
        // support JSON-encoded request bodies
        limit: '50mb',
        strict: true
      })
    );
    this.app.use(
      bodyParser.urlencoded({
        // support URL-encoded request bodies
        limit: '50mb',
        extended: true
      })
    );
  }

  /**
   * This function is responsible for taking the pathToEndpoints instance
   * variable and resolving API endpoints from it.
   */
  async initializeEndpoints() {
    // Because this.pathToEndpoints can either be an array or
    // string, we need to check before initializing the endpoints.
    if (Array.isArray(this.pathToEndpoints)) {
      this.pathToEndpoints.map((apiPath) => {
        this.app.use(this.prefix, require(apiPath));
      });
    } else {
      this.app.use(this.prefix, require(this.pathToEndpoints));
    }
  }

  /**
   * Create the http server and start listening on
   * the supplied port.
   */
  openConnection() {
    this.server = http.createServer(this.app);
    const { port } = this;
    this.server.listen(port, function() {
      console.debug(`Now listening on port ${port}`);
    });
  }

  /**
   * Return the current instance of the HTTP server. This function is useful
   * for making chai HTTP requests in our API testing files.
   * @returns {http.Server} The current instance of the HTTP server.
   */
  getServerInstance() {
    return this.server;
  }

  /**
   * Stop the server.
   */
  closeConnection() {
    this.server.close();
  }
}

// This if statement checks if the module was require()'d or if it was run
// by node server.js. If we are not requiring it and are running it from the
// command line, we create a server instance and start listening for requests.
if (typeof module !== 'undefined' && !module.parent) {
  const apiRoutes = [
    __dirname + '2DPrinting.js',
    __dirname + '3DPrinting.js',
    __dirname + 'LedSign.js'
  ];
  const server = new SceRpcApiServer(
    apiRoutes, 8083, '/SceRpcApi/');
  server.initializeEndpoints().then(() => {
    server.openConnection();
  });
}

module.exports = { SceRpcApiServer };
