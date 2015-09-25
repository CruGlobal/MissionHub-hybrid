angular.module('missionhub')
  .controller('PeopleFiltersController', function($scope, api) {
    var that = this;

    that.showList = [false, false, false, false];

    that.assigned_to_list = [{id: 1, name: 'Leader'}]
    that.group_list = [{id: 1, name: 'Bible Study 1'}]
    that.tag_list = [{id: 1, name: 'Leader'},{id: 2, name: 'Involved'},{id: 3, name: 'Engaged Disciple'}];

  });
