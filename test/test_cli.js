var should = require('should'),
    sinon = require('sinon'),
    cli = require('../lib/cli');

describe('$ deploy', function() {
  var deployStub = sinon.stub(),
      requiredOptions = [
        'node',
        '/path/to/deploy.js',
        'deployer',
      ];

  beforeEach(function() {
    deployStub.reset();
  });

  describe('deployer', function() {
    it('should be required', function() {
      var options = [
        'node',
        '/path/to/deploy.js',
      ];

      (function() {
        cli(options, deployStub);
      }).should.throw(/deployer is required/i);
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
          'dummy',
          '--test-arg=wow',
          '--butt'
        ],
        deployer,
        args;

    cli(options, deployStub);
    deployer = deployStub.getCall(0).args[0];
    args = deployStub.getCall(0).args[1];

    deployer.should.equal('dummy');
    args.testArg.should.equal('wow');
    args.butt.should.be.ok;
  });

  it('should pass a callback to deploy', function() {
    var callback = sinon.stub();

    cli(requiredOptions, deployStub, callback);

    deployStub.getCall(0).args[2].should.eql(callback);
  });

  it('should raise errors from the callback', function() {
    var callback;

    cli(requiredOptions, deployStub);
    callback = deployStub.getCall(0).args[2];

    (function() {
      callback('Error!');
    }).should.throw('Error!');
  });
});
