angular.module('missionhub')
  .directive('personSurveys', function(){
    return {
      restrict: 'E',
      templateUrl: 'profile/person.surveys.html',
      controller: 'PersonSurveysCtrl as surveysList',
      scope: {
        person: '='
      }
    };
  });
