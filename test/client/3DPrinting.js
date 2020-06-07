process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../client/config/config');
const { OK, BAD_REQUEST } = constants;
const tools = require('../util/tools.js');
const send3dPrintRequest =
  require('../../client/printing_3d/print_3d_client');
const sinon = require('sinon');

let app = null;
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);
const SUCCESS_MESSAGE = 'success';
const ERROR_MESSAGE = 'error';
const TEXT_REQUEST = {
  raw: '',
  name: 'cool guy evan',
  volume: 1,
  copies: 1
};

describe('3DPrinting', () => {
  const send3DPrintRequestMock = sinon
    .stub(send3dPrintRequest, 'send3dPrintRequest');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/3DPrinting.js');
    done();
  });

  after(done => {
    send3DPrintRequestMock.restore();
    tools.terminateServer();
    done();
  });

  afterEach(() => {
    send3DPrintRequestMock.reset();
  });

  describe('/POST print3dModel', () => {
    it('Should return statuscode 200 when request is completed', done => {
      send3DPrintRequestMock.resolves(SUCCESS_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/3dPrinter/print3dModel')
        .send(TEXT_REQUEST)
        .then(function(res) {
          expect(res).to.have.status(OK);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should return statuscode 400 if the RPC fails', done => {
      send3DPrintRequestMock.rejects(ERROR_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/3dPrinter/print3dModel')
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
