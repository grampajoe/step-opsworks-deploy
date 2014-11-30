var Deployer = require('../../lib/deployer');

exports = module.exports;

exports.itShouldBeADeployer = function() {
  it('should register itself', function() {
    this.deployer.constructor.name.should.equal(this.cls);
  });

  it('should inherit from Deployer', function() {
    this.deployer.should.be.an.instanceOf(Deployer);
  });
}
