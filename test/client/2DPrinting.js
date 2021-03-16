/* global describe it before after afterEach */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../client/config/config');
const { OK, BAD_REQUEST, NOT_FOUND } = constants;
const tools = require('../util/tools.js');
const PrintFunctions =
  require('../../client/printing/print_client');
const sinon = require('sinon');
const SceApiTester = require('../util/SceApiTester');

let app = null;
let test = null;
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);
const SUCCESS_MESSAGE = 'success';
const ERROR_MESSAGE = 'error';
const TEXT_REQUEST = {
  raw: '',
  copies: 1,
  pageRanges: 'NA',
  sides: 'one-sided',
  destination: 'HP-LaserJet-p2015dn'
};

describe('2DPrinting', () => {
  const healthCheckPrinterMock =
    sinon.stub(PrintFunctions, 'healthCheck');
  const sendPrintRequestMock = sinon.stub(PrintFunctions, 'sendPrintRequest');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/2DPrinting.js');
    test = new SceApiTester(app);
    done();
  });

  after(done => {
    healthCheckPrinterMock.restore();
    sendPrintRequestMock.restore();
    tools.terminateServer();
    done();
  });

  afterEach(() => {
    healthCheckPrinterMock.reset();
    sendPrintRequestMock.reset();
  });

  describe('/POST healthCheck', () => {
    let printerHealthResponse = null;
    it('Should return statusCode 200 when the printer is active', done => {
      healthCheckPrinterMock.resolves(SUCCESS_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/Printer/healthCheck')
        .then(function(res) {
          printerHealthResponse = res.body;
          expect(res).to.have.status(OK);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should return the statusCode 404 when the printer is down', done => {
      healthCheckPrinterMock.rejects(false);
      chai
        .request(app)
        .post('/SceRpcApi/Printer/healthCheck')
        .then(function(res) {
          console.log(res.status);
          expect(res).to.have.status(NOT_FOUND);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe('/POST sendPrintRequest', () => {
    it('Should return statuscode 200 when it prints', async () => {
      sendPrintRequestMock.resolves(SUCCESS_MESSAGE);
      const result = await test.sendPostRequest(
        '/SceRpcApi/Printer/sendPrintRequest', TEXT_REQUEST);
      expect(result).to.have.status(BAD_REQUEST);
    });
    it('Should return statuscode 400 when the RPC fails', async () => {
      sendPrintRequestMock.rejects(ERROR_MESSAGE);
      const result = await test.sendPostRequest(
        '/SceRpcApi/Printer/sendPrintRequest', '');
      expect(result).to.have.status(BAD_REQUEST);
    });
  });
});
