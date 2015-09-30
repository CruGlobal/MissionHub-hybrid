angular.module('missionhub')
.controller('PersonShowCtrl', function($scope, $stateParams, api, personCache) {
    var that = this;

    that.person = {};
    that.currentTab = 0;

    angular.extend(that.person, personCache.person($stateParams.contactId) || {});
    api.people.getPersonWithInfo($stateParams.contactId).then(function(data) {
      angular.extend(that.person, data.person);
      personCache.person(data.person)
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
