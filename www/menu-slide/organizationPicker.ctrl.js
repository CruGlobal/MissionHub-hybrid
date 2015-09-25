angular.module('missionhub')
  .controller('OrganizationPickerController', function($scope, organizationListCache, api) {
    var that = this;

    that.orgList = [];

    // get from cache
    that.orgList = organizationListCache.list();

    $scope.$on('current-org-updated', function(event, org) {
      that.orgList = organizationListCache.list();
    });

    that.selectOrg = function(org) {
      // dispatch event
      api.setCurrentOrg(org);
    };
  });
