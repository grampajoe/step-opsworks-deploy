var should = require('should'),
    sinon = require('sinon'),
    cli = require('../lib/cli');

describe('$ deploy', function() {
  var deployStub = sinon.stub(),
      requiredOptions = [
        'node',
        '/path/to/deploy.js',
        '--access-key-id=access-key-id',
        '--secret-access-key=secret-access-key',
        '--stack-id=stack-id',
        '--app-id=app-id'
      ],
      defaults;

  /* Returns an array of options without the ones matched by `expr`.
   */
  function optionsWithout(expr) {
    return requiredOptions.filter(function(arg) {
      return !arg.match(expr);
    });
  }

  function itShouldBeRequired() {
    it('should be required', function() {
      var flag = this.flag,
          options = optionsWithout(flag);

      (function() {
        cli(options);
      }).should.throw(new RegExp(flag + ' is required'));
    });
  }

  function itShouldUseTheEnvironment() {
    it('should be set by the environment', function() {
      var options = optionsWithout(this.flag),
          program;
      process.env[this.envvar] = 'thing-value'

      program = cli(options, deployStub);

      program[this.name].should.equal('thing-value');
    });
  }

  beforeEach(function() {
    deployStub.reset();

    // Keep existing env from interfering
    delete process.env['AWS_ACCESS_KEY_ID'];
    delete process.env['AWS_SECRET_ACCESS_KEY'];

    defaults = cli(requiredOptions, deployStub);
  });

  describe('--access-key-id', function() {
    beforeEach(function() {
      this.flag = '--access-key-id';
      this.name = 'accessKeyId';
      this.envvar = 'AWS_ACCESS_KEY_ID';
    });

    itShouldBeRequired();
    itShouldUseTheEnvironment();
  });

  describe('--secret-access-key', function() {
    beforeEach(function() {
      this.flag = '--secret-access-key';
      this.name = 'secretAccessKey';
      this.envvar = 'AWS_SECRET_ACCESS_KEY';
    });

    itShouldBeRequired();
    itShouldUseTheEnvironment();
  });

  describe('--stack-id', function() {
    beforeEach(function() {
      this.flag = '--stack-id';
    });

    itShouldBeRequired();
  });

  describe('--app-id', function() {
    beforeEach(function() {
      this.flag = '--app-id';
    });

    itShouldBeRequired();
  });

  describe('--region', function() {
    beforeEach(function() {
      this.flag = '--region';
      this.name = 'region';
      this.envvar = 'AWS_DEFAULT_REGION';
    });

    it('should default to us-east-1', function() {
      defaults.region.should.equal('us-east-1');
    });

    itShouldUseTheEnvironment();
  });

  describe('--migrate', function() {
    it('should default to false', function() {
      defaults.migrate.should.equal(false);
    });
  });

  describe('--comment', function() {
    it('should default to ""', function() {
      defaults.comment.should.equal('');
    });
  });

  it('should call the main deploy function', function() {
    cli(requiredOptions, deployStub);

    deployStub.called.should.be.ok;
  });

  it('should call deploy with passed-in args', function() {
    var options = [
      'node',
      '/path/to/deploy.js',
      '--access-key-id=access-key-id',
      '--secret-access-key=secret-access-key',
      '--stack-id=stack-id',
      '--app-id=app-id',
      '--region=region',
      '--migrate=true',
      '--comment=comment'
    ];

    cli(options, deployStub);

    deployStub.calledWith(
      'access-key-id',
      'secret-access-key',
      'stack-id',
      'app-id',
      'region',
      true,
      'comment'
    ).should.be.ok;
  });
});
