angular.module('missionhub')
  .controller('PersonInfoCtrl', function($scope, $filter) {
    var that = this;

    that.person = $scope.person || {};
    function filterEmptyAddresses() {
      return $filter('filter')(that.person.addresses, function(address) {
        return !!address.address1;
      })
    }
    that.person.addresses = filterEmptyAddresses();

    $scope.$watch('person.addresses', function() {
      var cleanArray = filterEmptyAddresses();
      if(cleanArray && cleanArray.length != that.person.addresses.length)
        that.person.addresses = filterEmptyAddresses();
    });
  });
