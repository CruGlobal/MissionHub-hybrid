'use strict';

describe('my app', function() {

  it('should automatically redirect to index when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/app/index");
  });

  describe('when logged in', function() {
    beforeEach(function() {
      // load pages
      browser.get('index.html');
      // inject login details
      browser.executeScript("localStorage.setItem('facebook_token', '" + browser.params.private.fb_token + "');");
      // reload with login cached
      browser.get('index.html');
    });

    it('should render load and show Mike', function() {
      browser.getHash('#/app/person/109906');
      expect(element.all(by.css('.profile-name')).first().getText()).
        toEqual('Mike Adamson');
    });

  });
});
