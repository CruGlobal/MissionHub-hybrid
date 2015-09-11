angular.module('missionhub')
.controller('PersonListCtrl', function($scope, api) {
  var that = this;

  that.people = [];
  that.offset = 0;
  that.limit = 20;
  that.hasMorePages = true;
  that.filters = function() {
    return {
      limit: that.limit,
      offset: that.offset
    };
  };

  that.refresh = function(config) {
    config = config ? config : that.filters;
    return api.people.get(config).then(function(data) {
      that.people = that.people.concat(data.people);
      that.hasMorePages = data.people.length < that.limit;
    });
  };

  that.firstPage = function() {
    that.offset = 0;
    that.people = [];
    that.refresh(that.filters).then(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  that.nextPage = function() {
    that.offset += that.limit;
    that.refresh(that.filters).then(function(){
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

});
