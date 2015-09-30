angular.module('missionhub')
  .controller('PersonInteractionsCtrl', function($scope, api) {
    var that = this;

    that.person = $scope.person || {};
    that.interactions = that.person.interactions;
    that.loading = true;

    $scope.$watch('person.id', function(){
      if (!that.person.id) {
        return;
      }

      api.interactions.getInteractionsForPerson(that.person.id).then(function(data){
        that.interactions = data.interactions;
        that.loading = false;
      }, function(error){
        that.loading = false;
      });
    });

    that.hasInteractions = function() {
      return that.interactions.length > 0;
    };

  });
