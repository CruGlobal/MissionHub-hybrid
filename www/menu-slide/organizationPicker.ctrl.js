angular.module('missionhub')
  .controller('OrganizationPickerController', function($scope, $ionicLoading, organizationListCache, api) {
    var that = this;

    that.orgList = [];

    // get from cache
    that.orgList = organizationListCache.list();

    that.refresh = function() {
      api.people.getMe()
        .then(function() {
          that.orgList = organizationListCache.list();
          that.displayCurrentOrg(undefined, api.currentOrg())
        })
        .finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };
    that.refresh();

    that.displayCurrentOrg = function(event, currentOrg) {
      angular.forEach(that.orgList, function(org) {
        org.selected = org.id == currentOrg.id;
      });
    };
    $scope.$on('current-org-updated', that.displayCurrentOrg);

    that.selectOrg = function(org) {
      api.currentOrg(org).then(function() {
          $scope.closeOrgPicker();
        },
        function(error) {
          // toast error
        }).finally(function() {
          $ionicLoading.hide();
        });
      $ionicLoading.show({
        template: 'Loading...'
      });
    };
  });
