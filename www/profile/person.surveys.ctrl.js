angular.module('missionhub')
  .controller('PersonSurveysCtrl', function($scope, api, personCache) {
    var that = this;

    that.person = $scope.person || {};
    that.surveys = that.person.answer_sheets || [];
    that.loading = true;

    $scope.$watch('person.id', function(){
      if (!that.person.id) {
        return;
      }

      api.people.getPersonWithSurveyAnswers(that.person.id).then(function(data) {
        that.surveys = data['person']['answer_sheets'];
        that.loading = false;
        angular.merge(that.person, data.person);
        personCache.person(data.person);
      }, function(error) {
        that.loading = false;
      });
    });

  });
