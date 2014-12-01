var Deployer = require('../deployer');

function DummyDeployer() {
};

DummyDeployer.prototype.__proto__ = Deployer.prototype;

DummyDeployer.prototype.deploy = function(options, callback) {
  callback(null);
};

Deployer.register('dummy', DummyDeployer);

exports = module.exports = DummyDeployer;
