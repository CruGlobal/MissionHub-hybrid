angular.module('missionhub')
.controller('PersonShowCtrl', function($scope, $stateParams, api) {
    var that = this;

    that.includes = ['organizational_permission' ,'permission', 'organizational_labels', 'label', 'interactions', 'email_addresses', 'phone_numbers', 'addresses'];
    that.person = {};

    api.people.get({id: $stateParams.contactId, include: that.includes.join()}).then(function(data) {
      that.person = data.person;
    }, function(error) {

    });

});
