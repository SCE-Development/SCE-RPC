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
  destination: 'HP-LaserJet-p2015dn'
};

describe('2DPrinting', () => {
  const sendPrintRequestMock = sinon.stub(PrintFunctions, 'sendPrintRequest');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/2DPrinting.js');
    done();
  });

  after(done => {
    sendPrintRequestMock.restore();
    tools.terminateServer();
    done();
  });

  afterEach(() => {
    sendPrintRequestMock.reset();
  });

  describe('/POST sendPrintRequest', () => {
    it('Should return statuscode 200 when it prints', done => {
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
