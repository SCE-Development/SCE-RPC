/* global describe it before after afterEach */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../client/config/config');
const { OK, BAD_REQUEST, NOT_FOUND } = constants;
const tools = require('../util/tools.js');
const LedSignFunctions =
  require('../../client/ledsign/led_sign_client');
const LoggingFunctions = require('../../client/util/logging-helpers');
const sinon = require('sinon');

let app = null;
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

const INVALID_SIGN_REQUEST = {
  text: 'Big Oof',
  brightness: 50,
  scrollSpeed: 50,
  backgroundColor: '#00FF00',
  textColor: '#FF0000',
  borderColor: '#0000FF',
  email: 'bigoof@gmail.com'
};
const VALID_SIGN_REQUEST = {
  text: 'Big Oof',
  brightness: 50,
  scrollSpeed: 50,
  backgroundColor: '#00FF00',
  textColor: '#FF0000',
  borderColor: '#0000FF',
  firstName: 'John Doe',
  email: 'bigoof@gmail.com'
};
const ERROR_MESSAGE = false;
const SUCCESS_MESSAGE = {
  message: {
    getText: () => {
      return VALID_SIGN_REQUEST.text;
    },
    getBrightness: () => {
      return VALID_SIGN_REQUEST.brightness;
    },
    getScrollSpeed: () => {
      return VALID_SIGN_REQUEST.scrollSpeed;
    },
    getBackgroundColor: () => {
      return VALID_SIGN_REQUEST.backgroundColor;
    },
    getTextColor: () => {
      return VALID_SIGN_REQUEST.textColor;
    },
    getBorderColor: () => {
      return VALID_SIGN_REQUEST.borderColor;
    }
  }
};

describe('LedSign', () => {
  const healthCheckMock = sinon.stub(LedSignFunctions, 'healthCheck');
  const updateSignTextMock = sinon.stub(LedSignFunctions, 'updateSignText');
  const addSignLogStub = sinon.stub(LoggingFunctions, 'addSignLog');

  before(done => {
    app = tools.initializeServer(__dirname + '/../../client/api/LedSign.js');
    done();
  });

  after(done => {
    addSignLogStub.restore();
    healthCheckMock.restore();
    updateSignTextMock.restore();
    sinon.restore();
    tools.terminateServer();
    done();
  });

  afterEach(() => {
    healthCheckMock.reset();
    updateSignTextMock.reset();
  });

  describe('/POST healthCheck', () => {
    let signResponse = null;
    it('Should return statusCode 200 when the sign is up', done => {
      healthCheckMock.resolves(SUCCESS_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/LedSign/healthCheck')
        .then(function(res) {
          signResponse = res.body;
          expect(res).to.have.status(OK);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should return the correct values when modified', done => {
      healthCheckMock.resolves(SUCCESS_MESSAGE);
      expect(signResponse.text).to.equal(VALID_SIGN_REQUEST.text);
      expect(signResponse.brightness).to.equal(VALID_SIGN_REQUEST.brightness);
      expect(signResponse.scrollSpeed).to.equal(VALID_SIGN_REQUEST.scrollSpeed);
      expect(signResponse.backgroundColor)
        .to.equal(VALID_SIGN_REQUEST.backgroundColor);
      expect(signResponse.textColor).to.equal(VALID_SIGN_REQUEST.textColor);
      expect(signResponse.borderColor).to.equal(VALID_SIGN_REQUEST.borderColor);
      done();
    });
    it('Should return statusCode 404 when the sign is down', done => {
      healthCheckMock.resolves(false);
      chai
        .request(app)
        .post('/SceRpcApi/LedSign/healthCheck')
        .then(function(res) {
          expect(res).to.have.status(NOT_FOUND);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe('/POST updateSignText', () => {
    it('Should return statusCode 200 when the sign text is updated', done => {
      addSignLogStub.resolves(SUCCESS_MESSAGE);
      updateSignTextMock.resolves(SUCCESS_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/LedSign/updateSignText')
        .send(VALID_SIGN_REQUEST)
        .then(function(res) {
          expect(res).to.have.status(OK);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should return statusCode 404 when the sign is down', done => {
      addSignLogStub.resolves(SUCCESS_MESSAGE);
      updateSignTextMock.rejects(ERROR_MESSAGE);
      chai
        .request(app)
        .post('/SceRpcApi/LedSign/updateSignText')
        .then(function(res) {
          expect(res).to.have.status(NOT_FOUND);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should return statuscode 400 when we can\'t log sign activity',
      done => {
        addSignLogStub.resolves(ERROR_MESSAGE);
        updateSignTextMock.rejects(ERROR_MESSAGE);
        chai
          .request(app)
          .post('/SceRpcApi/LedSign/updateSignText')
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
