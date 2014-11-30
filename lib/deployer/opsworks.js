var Deployer = require('../deployer');

function OpsWorksDeployer() {
};

OpsWorksDeployer.prototype.__proto__ = Deployer.prototype;

Deployer.register('opsworks', OpsWorksDeployer);

exports = module.exports = OpsWorksDeployer;
