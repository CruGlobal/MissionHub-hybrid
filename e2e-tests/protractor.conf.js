var private = require('./private.js');

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
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
