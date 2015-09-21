angular.module('missionhub')
  .controller('PersonInfoCtrl', function($scope) {
    var that = this;

    that.person = $scope.person || {};

  });