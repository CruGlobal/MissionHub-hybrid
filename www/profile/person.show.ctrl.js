angular.module('missionhub')
.controller('PersonShowCtrl', function($scope, $stateParams, api) {
    var that = this;

    that.person = {};

    api.people.get({id: $stateParams.contactId}).then(function(data) {
      that.person = data.person;
    }, function(error) {

    });

});
