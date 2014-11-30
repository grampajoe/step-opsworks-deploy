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
      ];

  /* Returns an array of options without the ones matched by `expr`.
   */
  function optionsWithout(expr) {
    return requiredOptions.filter(function(arg) {
      return !arg.match(expr);
    });
  }

  beforeEach(function() {
    deployStub.reset();
  });

  describe('required args', function() {
    it('should include --access-key-id', function() {
      var options = optionsWithout(/access-key-id/);

      (function() {
        cli(options);
      }).should.throw(/access-key-id/);
    });

    it('should include --secret-access-key', function() {
      var options = optionsWithout(/secret-access-key/);

      (function() {
        cli(options);
      }).should.throw(/secret-access-key/);
    });

    it('should include --stack-id', function() {
      var options = optionsWithout(/stack-id/);

      (function() {
        cli(options);
      }).should.throw(/stack-id/);
    });

    it('should include --app-id', function() {
      var options = optionsWithout(/app-id/);

      (function() {
        cli(options);
      }).should.throw(/app-id/);
    });
  });

  describe('by default', function() {
    var program;

    beforeEach(function() {
      program = cli(requiredOptions, deployStub);
    });

    it('should set --region to us-east-1', function() {
      program.region.should.equal('us-east-1');
    });

    it('should set --migrate to false', function() {
      program.migrate.should.equal(false);
    });

    it('should set --comment to ""', function() {
      program.comment.should.equal('');
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
