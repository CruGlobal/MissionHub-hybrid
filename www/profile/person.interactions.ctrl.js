angular.module('missionhub')
  .controller('PersonInteractionsCtrl', function($scope) {
    var that = this;

    that.person = $scope.person || {};

  });