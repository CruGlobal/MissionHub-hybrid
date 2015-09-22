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
  })
  .filter('personPrimaryPhone', function() {
    return function (person) {

      if (!person || !person.phone_numbers || person.phone_numbers.length == 0) {
        return '';
      }
      var i = 0;
      while (i < person.phone_numbers.length) {
        if(person.phone_numbers[i].primary)
          return person.phone_numbers[i].number;
        i++;
      }
      return person.phone_numbers[0].number;
    };
  })
  .filter('personFullname', function(){
    return function(person) {
      if (!person || !person.first_name) {
        return '';
      }
      return person.first_name + ' ' + person.last_name;
    };
  });
