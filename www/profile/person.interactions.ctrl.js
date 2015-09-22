angular.module('missionhub')
  .controller('PersonInteractionsCtrl', function($scope) {
    var that = this;

    that.person = $scope.person || {};

    var filters = {'filters[people_ids]': that.person.id};
    var includes = ['initiators', 'interaction_type', 'receiver', 'creator', 'last_updater'];

  });