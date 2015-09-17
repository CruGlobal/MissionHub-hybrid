angular.module('missionhub')
.filter('personAvatar', function() {

  return function (person, size) {

    size = size || 40;

    if (!person || !person.first_name) {
      return '';
    }
    if (person.picture) {
      return person.picture + '?width=' + size + '&height=' + size;
    }
    return "https://cdn.discourse.org/ionicframework/letter_avatar/" + person.first_name +
      "/" + size + "/5_fcf819f9b3791cb8c87edf29c8984f83.png";
  };
});
