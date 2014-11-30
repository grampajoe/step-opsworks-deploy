var should = require('should'),
    Deployer = require('../../lib/deployer');

describe('DummyDeployer', function() {
  var deployer;

  beforeEach(function() {
    deployer = Deployer.get('dummy');
  });

  it('should register itself', function() {
    deployer.constructor.name.should.equal('DummyDeployer');
  });

  it('should inherit from Deployer', function() {
    deployer.should.be.an.instanceOf(Deployer);
  });

  describe('#deploy', function() {
    it('should call the callback', function(done) {
      deployer.deploy({}, done);
    });
  });
});
