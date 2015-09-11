angular.module('missionhub')
  .factory('api', function($resource) {
    // put const here
    var that = this;
    that.facebook_token = 'CAADULZADslC0BAEgWnMJujJ2ismp3DUX8M3kfOeZAbFAoFbzsI1XB3zUaDkZBntsm7UBPZBE0mac53lOusxAjoZBVqPTAVNOpfy2PkOOoZBTNeluIlttn3CZB8geiZCsCqpO1qlOHpZBZClLosVz0KoRz4ZCsmmonCuEm1OwDYo4QVmET8PJO1BiZCM9Tr5x943Vd51hagAH3bOmpYSwUcHbST9kyrCkSl98D8GXwmZC6XbBBqAZDZD';

    //define methods
    function getMe() {
      return getPeople({id:'me'});
    }

    function getPeople(config) {
      var People = $resource('https://stage.missionhub.com/apis/v3/people/:id', {id:'@id', facebook_token: that.facebook_token});
      if (config.id) {
        return People.query(config).$promise;
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
  });
