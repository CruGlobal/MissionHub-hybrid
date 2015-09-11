angular.module('missionhub')
.controller('PersonListCtrl', function($scope, api) {
  var that = this;

  that.people = [];

  api.people.get({offset:0, limit:20}).then(function(data){
    that.people = data.people;
  });

})
