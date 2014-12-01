var Deployer = require('../deployer'),
    AWS = require('aws-sdk');

function OpsWorksDeployer() {
};

OpsWorksDeployer.prototype.__proto__ = Deployer.prototype;

OpsWorksDeployer.prototype.cleanOptions = function(options) {
  if(!options.accessKeyId) {
    if (process.env['AWS_ACCESS_KEY_ID']) {
      options.accessKeyId = process.env['AWS_ACCESS_KEY_ID'];
    } else {
      throw new Error('--access-key-id is required');
    }
  }

  if (!options.secretAccessKey) {
    if (process.env['AWS_SECRET_ACCESS_KEY']) {
      options.secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
    } else {
      throw new Error('--secret-access-key is required');
    }
  }

  if (!options.stackId) {
    throw new Error('--stack-id is required');
  }

  if (!options.appId) {
    throw new Error('--app-id is required');
  }

  if (!options.region) {
    if (process.env['AWS_DEFAULT_REGION']) {
      options.region = process.env['AWS_DEFAULT_REGION'];
    } else {
      options.region = 'us-east-1';
    }
  }

  if (!options.comment) {
    options.comment = '';
  }

  options.migrate = String(!!options.migrate);

  return options;
};

OpsWorksDeployer.prototype.getApi = function(options) {
  return new AWS.OpsWorks({
    'accessKeyId': options.accessKeyId,
    'secretAccessKey': options.secretAccessKey,
    'region': options.region
  });
};

OpsWorksDeployer.prototype.deploy = function(options, callback) {
  var api = this.getApi(options);

  function done(err, data) {
    callback(err);
  }

  api.createDeployment({
    Command: {
      Name: 'deploy',
      Args: {
        'migrate': [options.migrate]
      },
    },
    StackId: options.stackId,
    AppId: options.appId,
    Comment: options.comment
  }, done);
};

Deployer.register('opsworks', OpsWorksDeployer);

exports = module.exports = OpsWorksDeployer;
