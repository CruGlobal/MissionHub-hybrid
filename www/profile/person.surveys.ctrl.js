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
      var filters = {'filters[people_ids]': that.person.id};
      var includes = ['answer_sheets', 'answers'];
      var options = angular.extend({include: includes.join()}, filters);

      api.people.get({id: that.person.id, include: includes.join()}).then(function(data) {
        that.surveys = data['person']['answer_sheets'];
        that.loading = false;
        angular.merge(that.person, data.person);
        personCache.person(data.person);
      }, function(error) {
        that.loading = false;
      });
    });

  });
