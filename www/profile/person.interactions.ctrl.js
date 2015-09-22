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
      var filters = {'filters[people_ids]': that.person.id};
      var includes = ['initiators', 'interaction_type', 'receiver', 'creator', 'last_updater'];
      var options = angular.extend({include: includes.join()}, filters);

      api.interactions.get(options).then(function(data){
        that.interactions = data['interactions'];
        that.loading = false;
      }, function(error){
        that.loading = false;
      });
    });

    that.hasInteractions = function() {
      return that.interactions.length > 0;
    };

    that.isLoading = function() {
      return that.loading;
    };

  });