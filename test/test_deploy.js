var should = require('should'),
    sinon = require('sinon'),
    deploy = require('../lib/deploy'),
    Deployer = require('../lib/deployer');

describe('deploy', function() {
  beforeEach(function() {
    sinon.stub(Deployer.prototype, 'deploy');
  });

  afterEach(function() {
    Deployer.prototype.deploy.restore();
  });

  it('should call Deployer.deploy', function() {
    var options = {'hello': 'hi'},
        callback = sinon.stub();

    deploy(options, callback);

    new Deployer().deploy.calledWith(
      options,
      callback
    ).should.be.ok;
  });
});
