angular.module('missionhub')

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var that = this;
    this.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('personList/login.html', {
      scope: $scope,
      backdropClickToClose: false,
      hardwareBackButtonClose: false
    }).then(function(modal) {
      $scope.loginModal = modal;
      //$scope.loginModal.show();
    });
    $ionicModal.fromTemplateUrl('personList/filters.html', {
      scope: $scope
    }).then(function(modal) {
      that.filtersModal = modal;
    });

    $scope.closeLogin = function() {
      $scope.loginModal.hide();
    };

    $scope.login = function() {
      $scope.loginModal.show();
    };

    this.openFilters = function() {
      this.filtersModal.show();
    }
    $scope.closeFilters = function() {
      that.filtersModal.hide();
    };

    if(window.facebookConnectPlugin && facebookConnectPlugin.getLoginStatus) {
      window.facebookConnectPlugin.getLoginStatus(function(data){
        console.log(data)
      })
    }

    $scope.facebookLogin = function() {
      if(window.facebookConnectPlugin) {
        facebookConnectPlugin.login(["public_profile"],
          function(userData) {
            console.log(userData);
            localStorage.setItem('fb-login-info', JSON.stringify(userData))
          },
          function(message) {
            alert('Could not login: '+message)
          });
      }
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', that.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })


