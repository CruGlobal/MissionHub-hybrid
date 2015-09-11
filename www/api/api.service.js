angular.module('missionhub')
  .('api', function($http) {
    // put const here

    //define methods
    function getMe() {}

    // return interface
    return {
      getMe: getMe
    }
  });
