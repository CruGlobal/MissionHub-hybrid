angular.module('missionhub')
  .constant('config', {baseUrl: 'https://stage.missionhub.com/apis/v3/'})
  .factory('api', function($resource, $q, loginDetails, config, personCache) {
    // put const here
    //var that = this;

    function facebook_token() {
      return loginDetails.token();
    }

    function mhResource(endpoint, options) {
      if(!loginDetails.token()) {
        var deferred = $q.defer();
        deferred.resolve({endpoint: []});
        return deferred.promise;
      } else {
        return $resource(config.baseUrl + endpoint +'/:id', {id:'@id', facebook_token: facebook_token()}).get(options).$promise;
      }
    }

    //define methods
    function getMe() {
      return getPeople({id:'me'});
    }

    function getPeople(options) {
      var promise = mhResource('people', options);
      promise.then(function(data) {
        // save to cache now
        angular.forEach(data.people, function(person) {
          personCache.person(person)
        });
      });
      return promise;
    }

    function getInteractions(options) {
      return mhResource('interactions', options);
    }

    function getOrganizations(options) {
      return mhResource('organizations', options);
    }

    // return interface
    return {
      getMe: getMe,
      people: {
        get: getPeople
      },
      interactions: {
        get: getInteractions
      },
      organizations: {
        get: getOrganizations
      }
    }
  })

  .factory('loginDetails', function () {
    var tokenStorageKey = 'facebook_token';

    function token(value) {
      if(value !== undefined) {
        if(value) {
          localStorage.setItem(tokenStorageKey, value);
        }
        else {
          localStorage.removeItem(tokenStorageKey);
        }
      }
      else {
        return localStorage.getItem(tokenStorageKey);
      }
    }

    return {
      token: token
    };
  });
