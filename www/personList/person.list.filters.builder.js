angular.module('missionhub')
  .factory('personFiltersBuilder', function ($rootScope, lodash, $state) {
    var filters = {};

    function clear() {
      filters = {
        labels: [],
        assigned_to: []
      };
      $rootScope.$broadcast('personFilters.change');
      return _interface;
    }
    clear();

    function getFilters() {
      return angular.merge({}, filters);
    }

    function go() {
      $rootScope.$broadcast('personFilters.doneChanging');
      //var hash_string = '#/app/index';
      //hash_string += '?' +
      //  lodash.chain(filters)
      //    .map(function(value, key){
      //      if(!value || value.length == 0) {
      //        return undefined
      //      }
      //      var v = angular.isArray(value) ? value.join(',') : value;
      //      return key + '=' + v;
      //    })
      //    .compact()
      //    .join('&')
      //    .value();
      //window.location.hash = hash_string;
      // http://localhost:8100/#/app/index?assigned_to=93487
      $state.go('app.index', {}, {reload: false, inherit: false, notify: true});
      //$state.transitionTo()
      return _interface;
    }

    function add(key, value) {
      if (angular.isArray(value)) {
        filters[key] = filters[key].concat(value);
      } else {
        filters[key].push(value);
      }
      $rootScope.$broadcast('personFilters.change');
      return _interface;
    }

    function remove(key, value) {
      lodash.remove(filters[key], value);
      $rootScope.$broadcast('personFilters.change');
      return _interface;
    }

    function set(key, value) {
      if (!angular.isArray(value)) {
        value = [value];
      }
      filters[key] = value;
      $rootScope.$broadcast('personFilters.change');
      return _interface;
    }

    var _interface = {
      add: add,
      remove: remove,
      set: set,
      get: getFilters,
      go: go,
      clear: clear
    };
    return _interface;
  });
