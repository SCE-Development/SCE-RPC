/* global describe it before after afterEach */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../client/config/config');
const { OK, BAD_REQUEST } = constants;
const tools = require('../util/tools.js');
const ResumeFunctions =
  require('../../client/resume/resume_client');
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
};

describe('Resume', () => {
  const sendResumeRequestMock =
  sinon.stub(ResumeFunctions, 'sendResumeRequest');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/Resume.js');
    test = new SceApiTester(app);
    done();
  });

  after(done => {
    sendResumeRequestMock.restore();
    tools.terminateServer();
    done();
  });

  afterEach(() => {
    sendResumeRequestMock.reset();
  });

  describe('/POST sendResumeRequest', () => {
    it('Should return statuscode 200 when it generates a resume', async () => {
      sendResumeRequestMock.resolves(SUCCESS_MESSAGE);
      const result = await test.sendPostRequest(
        '/SceRpcApi/Resume/sendResumeRequest', TEXT_REQUEST);
      expect(result).to.have.status(OK);
    });
    it('Should return statuscode 400 when the RPC fails', async () => {
      sendResumeRequestMock.rejects(ERROR_MESSAGE);
      const result = await test.sendPostRequest(
        '/SceRpcApi/Resume/sendResumeRequest', '');
      expect(result).to.have.status(BAD_REQUEST);
    });
  });
});
