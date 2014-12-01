// Runs the deploy command.
exports = module.exports = function(argv, deploy, callback) {
  var yargs = require('yargs'),
      args = yargs.parse(argv),
      deployer = args._[2];

  if (!deployer) {
    throw new Error('deployer is required');
  }

  callback = callback || function(err) {
    if (err) {
      throw new Error(err);
    }

    console.info('Deploy complete!');
  };

  deploy(deployer, args, callback);

  return args;
}
