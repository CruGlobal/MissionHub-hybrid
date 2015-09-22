angular.module('missionhub')
  .directive('personAddress', function(){
    return {
      restrict: 'E',
      template: '<a class="person-address" ng-href="{{address | googleMapsAddress}}" target="_blank">' +
                  '<span ng-show="address.address1">{{address.address1}}<br></span>' +
                  '<span ng-show="address.address2">{{address.address2}}<br></span>' +
                  '<span ng-show="address.city">{{address.city}}, </span>' + '<span ng-show="address.state">{{address.state}} </span>' + '<span ng-show="address.zip">{{address.zip}}</span> <br ng-show="address.city || address.state || address.zip" />' +
                  '<span ng-show="address.country">{{address.country}}<br></span>' +
                  '<span class="badge badge-positive">{{address.address_type}}</span>' +
                '</a>',
      scope: {
        address: '='
      }
    };
  });