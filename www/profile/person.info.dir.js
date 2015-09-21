angular.module('missionhub')
.directive('personInfo', function(){
  return {
    restrict: 'E',
    templateUrl: 'profile/person.info.html',
    controller: 'PersonInfoCtrl as info',
    scope: {
      person: '='
    }
  };
});