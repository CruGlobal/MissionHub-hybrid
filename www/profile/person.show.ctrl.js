angular.module('missionhub')
.controller('PersonShowCtrl', function($scope, $stateParams, api) {
    var that = this;

    that.includes = ['organizational_permission' ,'permission', 'organizational_labels', 'label', 'interactions', 'email_addresses', 'phone_numbers', 'addresses'];
    that.person = {};
    that.currentTab = 1;

    api.people.get({id: $stateParams.contactId, include: that.includes.join()}).then(function(data) {
      angular.extend(that.person, data.person);
    }, function(error) {

    });

    that.setTab = function(tab) {
      tab = tab || 0;
      that.currentTab = tab;
    };

    that.isCurrentTab = function(tab) {
      return that.currentTab === tab;
    };

});
