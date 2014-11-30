var Deployer = require('../../lib/deployer');

exports = module.exports;

// Deployers

exports.itShouldBeADeployer = function() {
  it('should register itself', function() {
    this.deployer.constructor.name.should.equal(this.cls);
  });

  it('should inherit from Deployer', function() {
    this.deployer.should.be.an.instanceOf(Deployer);
  });
}

// Options

exports.itShouldBeRequired = function() {
  it('should be required', function() {
    var deployer = this.deployer,
        options = this.required;

    delete options[this.name];

    (function() {
      deployer.cleanOptions(options);
    }).should.throw(new RegExp(this.flag + ' is required'));
  });
}

exports.itShouldUseTheEnvironment = function() {
  it('should be set by the environment', function() {
    var options = this.required,
        args;

    delete options[this.name];
    process.env[this.envvar] = 'thing-value'

    cleaned = this.deployer.cleanOptions(options);

    cleaned[this.name].should.equal('thing-value');

    // Clean up
    delete process.env[this.envvar];
  });
}
