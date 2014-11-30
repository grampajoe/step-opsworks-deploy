var should = require('should'),
    sinon = require('sinon'),
    Deployer = require('../lib/deployer');

describe('Deployer', function() {
  describe('.get', function() {
    it('should return a deployer', function() {
      var deployer = sinon.stub();

      Deployer._deployers['butt'] = deployer;

      Deployer.get('butt').should.equal(deployer);
    });

    it('should throw an error for missing deployers', function() {
      (function() {
        Deployer.get('fart');
      }).should.throw(/not found/);
    });
  });

  describe('.register', function() {
    it('should add a deployer', function() {
      var deployer = sinon.stub();

      Deployer.register('butt', deployer);

      Deployer._deployers['butt'].should.equal(deployer);
    });
  });

  describe('#validateOptions', function() {
    it('should do nothing', function() {
      var deployer = new Deployer();

      deployer.validateOptions({'butt': 'fart'});
    });
  });

  describe('#deploy', function() {
    it('should raise a not implemented exception', function() {
      var deployer = new Deployer();

      deployer.deploy.should.throw(/not implemented/i);
    });
  });
});
