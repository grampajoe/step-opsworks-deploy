/* Runs the deploy command.
 *
 * The program is set up inside this function to provide an isolated
 * environment for testing.
 */

exports = module.exports = function(argv, deploy) {
  var Command = require('commander').Command,
      program = new Command();

  program
    .version('1.0.0')
    .option('--access-key-id <string>', 'AWS access key ID')
    .option('--secret-access-key <string>', 'AWS secret access key')
    .option('--region <string>', 'AWS region.', String, 'us-east-1')
    .option('--stack-id <string>', 'OpsWorks stack ID')
    .option('--app-id <string>', 'OpsWorks app ID')
    .option('--migrate <bool>', 'Whether to run migrations.', Boolean, false)
    .option('--comment <string>', 'Comment for the deployment.', String, '')
    .parse(argv);

  if(!program.accessKeyId) {
    if (process.env['AWS_ACCESS_KEY_ID']) {
      program.accessKeyId = process.env['AWS_ACCESS_KEY_ID'];
    } else {
      throw new Error('--access-key-id is required');
    }
  }

  if (!program.secretAccessKey) {
    if (process.env['AWS_SECRET_ACCESS_KEY']) {
      program.secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
    } else {
      throw new Error('--secret-access-key is required');
    }
  }

  if (!program.stackId) {
    throw new Error('--stack-id is required');
  }

  if (!program.appId) {
    throw new Error('--app-id is required');
  }

  deploy(
    program.accessKeyId,
    program.secretAccessKey,
    program.stackId,
    program.appId,
    program.region,
    program.migrate,
    program.comment
  );

  return program;
}
