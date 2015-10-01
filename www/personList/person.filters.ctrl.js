angular.module('missionhub')
  .controller('PeopleFiltersController', function($scope, $filter, lodash, personFiltersBuilder) {
    var that = this;

    that.showList = [false, false, false, false];
    function resetCounts() {
      that.selectedCounts = {leader: 0, group: 0, label: 0, interaction: 0}
    }
    resetCounts();

    that.contactAssignments = [{id: 1, name: 'Leader'}];
    that.group_list = [{id: 1, name: 'Bible Study 1'}];
    that.labels = [{id: 1, name: 'Leader'},{id: 2, name: 'Involved'},{id: 3, name: 'Engaged Disciple'}];
    that.interactions = [];

    that.updateOptions = function(event, org) {
      resetCounts();
      that.labels = lodash.sortBy(org.labels, 'name');
      that.contactAssignments = lodash.sortBy(org.admins.concat(org.users), function(contactAssignment) {
        return $filter('personFullname')(contactAssignment);
      });
    };

    $scope.$on('current-org-updated', that.updateOptions);

    that.toggleFilter = function(type, object) {
      object.selected = !object.selected;
      that.selectedCounts[type] += object.selected ? 1 : -1;
      personFiltersBuilder[object.selected ? 'add' : 'remove'](type, object.id);
    };

    $scope.$on('filtersModal.show', function() {
      resetCounts();
      var filters = personFiltersBuilder.get();
      lodash.each(that.contactAssignments, function(contact) {
        contact.selected = lodash.indexOf(filters.assigned_to, contact.id) != -1;
        if(contact.selected) {
          that.selectedCounts.leader++;
        }
      });

      lodash.each(that.labels, function(label) {
        label.selected = lodash.indexOf(filters.labels, label.id) != -1;
        if(label.selected) {
          that.selectedCounts.label++;
        }
      });
    })
  });
