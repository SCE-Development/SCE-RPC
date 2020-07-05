/* global describe it before after afterEach */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../client/config/config');
const { OK, BAD_REQUEST } = constants;
const tools = require('../util/tools.js');
const PrintFunctions =
  require('../../client/printing/print_client');
const LoggingFunctions = require('../../client/util/logging-helpers');
const sinon = require('sinon');

let app = null;
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
  destination: 'HP-LaserJet-p2015dn',
  memberName: 'Bob Ross',
  pagesPrinted: 3,
  printedDate: new Date('07/02/2020').toISOString()
};

describe('2DPrinting', () => {
  const sendPrintRequestMock = sinon.stub(PrintFunctions, 'sendPrintRequest');
  const addPrintLogStub = sinon.stub(LoggingFunctions, 'addPrintLog');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/2DPrinting.js');
    done();
  });

  after(done => {
    addPrintLogStub.restore();
    sendPrintRequestMock.restore();
    tools.terminateServer();
    done();
  });

  afterEach(() => {
    sendPrintRequestMock.reset();
  });

  describe('/POST sendPrintRequest', () => {
    it('Should return statuscode 200 when it prints', done => {
      addPrintLogStub.resolves(SUCCESS_MESSAGE);
      sendPrintRequestMock.resolves(SUCCESS_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/Printer/sendPrintRequest')
        .send(TEXT_REQUEST)
        .then(function(res) {
          expect(res).to.have.status(OK);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should return statuscode 400 when the RPC fails', done => {
      addPrintLogStub.resolves(ERROR_MESSAGE);
      sendPrintRequestMock.rejects(ERROR_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/Printer/sendPrintRequest')
        .then(function(res) {
          expect(res).to.have.status(BAD_REQUEST);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
  });
});
