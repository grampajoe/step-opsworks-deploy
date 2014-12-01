var should = require('should'),
    sinon = require('sinon'),
    shared = require('./shared'),
    Deployer = require('../../lib/deployer'),
    AWS = require('aws-sdk');

describe('OpsWorksDeployer', function() {
  beforeEach(function() {
    this.deployer = Deployer.get('opsworks');
    this.cls = 'OpsWorksDeployer';
    this.required = {
      'accessKeyId': 'access-key-id',
      'secretAccessKey': 'secret-access-key',
      'stackId': 'stack-id',
      'appId': 'app-id',
    };

    this.defaults = this.deployer.cleanOptions(this.required);
    this.OpsWorksStub = sinon.stub(AWS, 'OpsWorks');
  });

  afterEach(function() {
    AWS.OpsWorks.restore();
  });

  shared.itShouldBeADeployer();

  describe('#cleanOptions', function() {
    describe('accessKeyId', function() {
      beforeEach(function() {
        this.flag = '--access-key-id';
        this.name = 'accessKeyId';
        this.envvar = 'AWS_ACCESS_KEY_ID';
      });

      shared.itShouldBeRequired();
      shared.itShouldUseTheEnvironment();
    });

    describe('secretAccessKey', function() {
      beforeEach(function() {
        this.flag = '--secret-access-key';
        this.name = 'secretAccessKey';
        this.envvar = 'AWS_SECRET_ACCESS_KEY';
      });

      shared.itShouldBeRequired();
      shared.itShouldUseTheEnvironment();
    });

    describe('stackId', function() {
      beforeEach(function() {
        this.flag = '--stack-id';
        this.name = 'stackId';
      });

      shared.itShouldBeRequired();
    });

    describe('appId', function() {
      beforeEach(function() {
        this.flag = '--app-id';
        this.name = 'appId';
      });

      shared.itShouldBeRequired();
    });

    describe('region', function() {
      beforeEach(function() {
        this.flag = '--region';
        this.name = 'region';
        this.envvar = 'AWS_DEFAULT_REGION';
      });

      shared.itShouldUseTheEnvironment();

      it('should default to us-east-1', function() {
        this.defaults.region.should.equal('us-east-1');
      });
    });

    describe('migrate', function() {
      it('should default to false', function() {
        this.defaults.migrate.should.equal('false');
      });

      it('should be coerced to a string', function() {
        var options = this.required,
            cleaned;
        options.migrate = true;

        cleaned = this.deployer.cleanOptions(options);

        cleaned.migrate.should.equal('true');
      });
    });

    describe('comment', function() {
      it('should default to ""', function() {
        this.defaults.comment.should.equal('');
      });
    });
  });

  describe('#getApi', function() {
    beforeEach(function() {
      this.options = {
        'accessKeyId': 'access-key-id',
        'secretAccessKey': 'secret-access-key',
        'region': 'region',
      };
    });

    it('should return an AWS.OpsWorks instance', function() {
      var api = this.deployer.getApi(this.options);

      api.should.be.an.instanceOf(AWS.OpsWorks);
    });

    it('should pass in the config', function() {
      this.deployer.getApi(this.options);

      this.OpsWorksStub.calledWith({
        'accessKeyId': 'access-key-id',
        'secretAccessKey': 'secret-access-key',
        'region': 'region'
      }).should.be.ok;
    });
  });

  describe('#deploy', function() {
    beforeEach(function() {
      this.api = sinon.stub();
      this.api.createDeployment = sinon.stub();
      sinon.stub(this.deployer, 'getApi').returns(this.api);
    });

    afterEach(function() {
      this.deployer.getApi.restore();
    });

    it('should pass config to getApi', function() {
      var options = {};

      this.deployer.deploy(options);

      this.deployer.getApi.calledWith(options).should.be.ok;
    });

    it('should create a deployment', function() {
      this.deployer.deploy({});

      this.api.createDeployment.called.should.be.ok;
    });

    it('should set deployment args', function() {
      var args,
          params,
          callback;

      this.deployer.deploy({
        'stackId': 'stack-id',
        'appId': 'app-id',
        'comment': 'comment',
        'migrate': 'true'
      });

      args = this.api.createDeployment.getCall(0).args;
      params = args[0];

      params.should.eql({
        Command: {
          Name: 'deploy',
          Args: {
            'migrate': ['true'],
          },
        },
        StackId: 'stack-id',
        AppId: 'app-id',
        Comment: 'comment'
      });
    });

    it('should call the callback', function(done) {
      var args,
          callback;

      this.deployer.deploy({}, done);

      args = this.api.createDeployment.getCall(0).args;
      callback = args[1];

      // Pretend createDeployment called its callback
      callback(null, {DeploymentId: '123'});
    });

    it('should send errors to the callback', function(done) {
      function callback(err) {
        err.should.eql('Whoops!');
        done();
      }

      this.deployer.deploy({}, callback);

      args = this.api.createDeployment.getCall(0).args;
      callback = args[1];

      callback('Whoops!', null);
    });
  });
});
