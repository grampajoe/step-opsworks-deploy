var should = require('should'),
    shared = require('./shared'),
    Deployer = require('../../lib/deployer');

describe('OpsWorksDeployer', function() {
  beforeEach(function() {
    this.deployer = Deployer.get('opsworks');
    this.cls = 'OpsWorksDeployer';
  });

  shared.itShouldBeADeployer();
});
