angular.module('missionhub')
  .directive('personInteractions', function(){
    return {
      restrict: 'E',
      templateUrl: 'profile/person.interactions.html',
      controller: 'PersonInteractionsCtrl as interactionsList',
      scope: {
        person: '='
      }
    };
  });