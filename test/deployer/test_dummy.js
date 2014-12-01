var should = require('should'),
    shared = require('./shared'),
    Deployer = require('../../lib/deployer');

describe('DummyDeployer', function() {
  beforeEach(function() {
    this.deployer = Deployer.get('dummy');
    this.cls = 'DummyDeployer';
  });

  shared.itShouldBeADeployer();

  describe('#deploy', function() {
    it('should call the callback', function(done) {
      this.deployer.deploy({}, done);
    });
  });
});
