angular.module('missionhub')
.filter('backgroundStyle', function(){
  return function(url) {
    return 'background-image: url(' + url + ')';
  }
});