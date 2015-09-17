angular.module('missionhub')
.filter('personAvatar', function() {

  return function (person) {
    if (!person) {
      return '';
    }
    if (person.picture) {
      return person.picture;
    }
    return "https://cdn.discourse.org/ionicframework/letter_avatar/" + person.first_name +
      "/40/5_fcf819f9b3791cb8c87edf29c8984f83.png";
  };
})
.filter('backgroundStyle', function(){
  return function(url) {
    return 'background-image: url(' + url + ')';
  }
});