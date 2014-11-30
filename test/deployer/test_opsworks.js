var should = require('should'),
    shared = require('./shared'),
    Deployer = require('../../lib/deployer');

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
        this.defaults.migrate.should.equal(false);
      });
    });

    describe('comment', function() {
      it('should default to ""', function() {
        this.defaults.comment.should.equal('');
      });
    });
  });
});
