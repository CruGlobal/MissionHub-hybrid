angular.module('missionhub')
.controller('PersonListCtrl', function($scope, api, Person) {
  var that = this;

  that.people = [];
  that.offset = 0;
  that.limit = 20;
  that.hasMorePages = true;
  that.filters = function() {
    var filters = {
      limit: that.limit,
      offset: that.offset
    };

    if (that.searchTerm !== '') {
      filters['filters[name_or_email_like]'] = that.searchTerm;
    }

    return filters;
  };

  that.refresh = function(config, replacePeopleWithData) {
    config = config ? config : that.filters();
    return api.people.get(config).then(function(data) {
      that.people = replacePeopleWithData ? data.people : that.people.concat(data.people);
      that.hasMorePages = data.people.length == that.limit;
    });
  };

  that.firstPage = function() {
    that.offset = 0;
    that.refresh(that.filters(), true).then(function(data) {
      $scope.$broadcast('scroll.refreshComplete');
    }, function(error) {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  that.nextPage = function() {
    that.offset += that.limit;
    that.refresh().then(function() {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function(error) {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  that.search = function() {
    that.offset = 0;
    that.refresh(that.filters(), true);
  };

});