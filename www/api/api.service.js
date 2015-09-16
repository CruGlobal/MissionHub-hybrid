angular.module('missionhub')
  .factory('api', function($resource, $q, loginDetails) {
    // put const here
    var that = this;

    function facebook_token() {
      return loginDetails.token();
    };

    //define methods
    function getMe() {
      return getPeople({id:'me'});
    }

    function getPeople(config) {
      if(!loginDetails.token()) {
        var deferred = $q.defer();
        deferred.resolve({people: []})
        return deferred.promise;
      }
      var People = $resource('https://stage.missionhub.com/apis/v3/people/:id', {id:'@id', facebook_token: facebook_token()});
      if (config.id) {
        return People.get(config).$promise;
      }
      else {
        return People.get(config).$promise;
      }
    }

    // return interface
    return {
      getMe: getMe,
      people: {
        get: getPeople
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
  })

  .factory('Person', function(){

    var that = this;
    that.person = {};

    that.setData = function(data) {
      that.person = data;
      return that;
    };

    that.avatar = function() {
      that.person.picture;
    };

    return {
      setData: that.setData,
      avatar: that.avatar
    };

  });
