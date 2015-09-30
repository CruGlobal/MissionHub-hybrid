angular.module('missionhub')
  .controller('PeopleFiltersController', function($scope, $filter, lodash) {
    var that = this;

    that.showList = [false, false, false, false];
    function resetCounts() {
      that.selectedCounts = {leader: 0, group: 0, label: 0, interaction: 0}
    }
    resetCounts();

    that.contactAssignments = [{id: 1, name: 'Leader'}];
    that.group_list = [{id: 1, name: 'Bible Study 1'}];
    that.lables = [{id: 1, name: 'Leader'},{id: 2, name: 'Involved'},{id: 3, name: 'Engaged Disciple'}];
    that.interactions = [];

    that.updateMenu = function(event, org) {
      that.labels = lodash.sortBy(org.labels, 'name');
      that.contactAssignments = lodash.sortBy(org.admins.concat(org.users), function(contactAssignment) {
        return $filter('personFullname')(contactAssignment);
      });
    };

    $scope.$on('current-org-updated', that.updateMenu);

    that.toggleFilter = function(type, object) {
      object.selected = !object.selected;
      that.selectedCounts[type] += object.selected ? 1 : -1;
    }
  });
