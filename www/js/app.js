
angular.module('missionhub', ['ionic', 'ngResource', 'ti-segmented-control', 'ngLodash'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'menu-slide/menu.html',
    controller: 'AppCtrl as app'
  })

  .state('app.index', {
    url: '/index?assigned_to&labels',
    views: {
      'menuContent': {
        templateUrl: 'personList/person.list.html',
        controller: 'PersonListCtrl as peopleList'
      }
    }
  })

    .state('app.personNew', {
      url: '/person/new',
      views: {
        'menuContent': {
          templateUrl: 'profile/person.new.html',
          //controller: 'PersonShowCtrl as profile'
        }
      }
    })

    .state('app.personEdit', {
      url: '/person/:contactId/edit',
      views: {
        'menuContent': {
          templateUrl: 'profile/person.new.html',
          //controller: 'PersonShowCtrl as profile'
        }
      }
    })

    .state('app.personShow', {
      url: '/person/:contactId',
      views: {
        'menuContent': {
          templateUrl: 'profile/person.show.html',
          controller: 'PersonShowCtrl as profile'
        }
      }
    });
  $urlRouterProvider.otherwise('/app/index');

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|sms)?:?/);
});
