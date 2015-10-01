var private = require('./private');

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    browserName: 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path
  },

  baseUrl: 'http://localhost:8000/www/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: function() {
    browser.getHash = function(hash) {
      browser.executeScript("location.hash = '" + hash + "'");
    };
  },
  params: {
    private: private
  }
};
