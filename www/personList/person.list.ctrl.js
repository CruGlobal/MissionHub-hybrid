angular.module('missionhub')
.controller('PersonListCtrl', function($scope, $stateParams, api, personFiltersBuilder) {
  var that = this;

  that.people = [];
  that.offset = -20;
  that.limit = 20;
  that.hasMorePages = true;
  that.loading = true;

  that.filters = function() {
    var _personFilters = personFiltersBuilder.get();
    var filters = {
      limit: that.limit,
      offset: that.offset
    };

    if (that.searchTerm) {
      filters['filters[name_or_email_like]'] = that.searchTerm;
    }

    if (_personFilters.assigned_to.length > 0) {
      filters['filters[assigned_to]'] = _personFilters.assigned_to;
    }

    if (_personFilters.labels > 0) {
      filters['filters[labels]'] = _personFilters.labels;
    }

    return filters;
  };

  $scope.$on('current-org-updated', function(event, org) {
    personFiltersBuilder.clear();
  });

  that.refresh = function(config, replacePeopleWithData) {
    that.loading = true;
    config = config ? config : that.filters();
    return api.people.get(config).then(function(data) {
      that.people = replacePeopleWithData ? data.people : that.people.concat(data.people);
      that.hasMorePages = data.people.length == that.limit;
      that.loading = false;
    });
  };

  that.firstPage = function() {
    that.offset = 0;
    that.refresh(that.filters(), true).then(function() { // success
      $scope.$broadcast('scroll.refreshComplete');
    }, function() { // error
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  that.nextPage = function() {
    that.offset += that.limit;
    that.refresh().then(function() { // succcess
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function() { // error
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  that.search = function() {
    that.offset = 0;
    that.refresh(that.filters(), true);
  };

  $scope.$on('personFilters.doneChanging', that.firstPage);

});
