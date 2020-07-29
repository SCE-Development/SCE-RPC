process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../client/config/config');
const { OK, BAD_REQUEST } = constants;
const tools = require('../util/tools.js');
const send3dPrintRequest =
  require('../../client/printing_3d/print_3d_client');
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
  name: 'cool guy evan',
  volume: 1,
  copies: 1
};

describe('3DPrinting', () => {
  const send3DPrintRequestMock = sinon
    .stub(send3dPrintRequest, 'send3dPrintRequest');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/3DPrinting.js');
    test = new SceApiTester(app);
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
    it('Should return statuscode 200 when request is completed', async () => {
      send3DPrintRequestMock.resolves(SUCCESS_MESSAGE);
      const result = await test.sendPostRequest(
        '/SceRpcApi/3dPrinter/print3dModel', TEXT_REQUEST);
      expect(result).to.have.status(OK);
    });
    it('Should return statuscode 400 if the RPC fails', async () => {
      send3DPrintRequestMock.rejects(ERROR_MESSAGE);
      const result = await test.sendPostRequest(
        '/SceRpcApi/3dPrinter/print3dModel', '');
      expect(result).to.have.status(BAD_REQUEST);
    });
  });
});
