angular.module('missionhub')
  .controller('OrganizationPickerController', function($scope, organizationListCache, api) {
    var that = this;

    that.orgList = [];

    // get from cache
    that.orgList = organizationListCache.list();

    // get remote
    that.refresh = function() {
      that.orgList = []
      return api.organizations.get().then(function(data) {
        that.orgList = data.organizations;
      }, function(error) {
        // show error
      });
    };
    that.refresh();

    that.selectOrg = function() {
      // dispatch event
    };
  });
