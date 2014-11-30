/* Runs the deploy command.
 *
 * The program is set up inside this function to provide an isolated
 * environment for testing.
 */

exports = module.exports = function(argv, deploy, callback) {
  var yargs = require('yargs'),
      args = yargs.parse(argv);

  if(!args.accessKeyId) {
    if (process.env['AWS_ACCESS_KEY_ID']) {
      args.accessKeyId = process.env['AWS_ACCESS_KEY_ID'];
    } else {
      throw new Error('--access-key-id is required');
    }
  }

  if (!args.secretAccessKey) {
    if (process.env['AWS_SECRET_ACCESS_KEY']) {
      args.secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
    } else {
      throw new Error('--secret-access-key is required');
    }
  }

  if (!args.stackId) {
    throw new Error('--stack-id is required');
  }

  if (!args.appId) {
    throw new Error('--app-id is required');
  }

  if (!args.region) {
    if (process.env['AWS_DEFAULT_REGION']) {
      args.region = process.env['AWS_DEFAULT_REGION'];
    } else {
      args.region = 'us-east-1';
    }
  }

  if (!args.comment) {
    args.comment = '';
  }

  args.migrate = !!args.migrate;

  callback = callback || function() {
    console.info('Deploy complete!');
  };

  deploy(args, callback);

  return args;
}
