var Deployer = require('./deployer');

function deploy(options, callback) {
  var deployer = new Deployer();

  deployer.deploy(options, callback);
}

exports = module.exports = deploy;
