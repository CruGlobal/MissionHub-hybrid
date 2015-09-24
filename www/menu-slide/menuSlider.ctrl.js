angular.module('missionhub')
  .controller('AppCtrl', function($scope, $ionicModal, $timeout, loginDetails) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var that = this;
    this.loginData = {};

    // init the modals
    $ionicModal.fromTemplateUrl('personList/login.html', {
      scope: $scope,
      backdropClickToClose: false,
      hardwareBackButtonClose: false
    }).then(function(modal) {
      that.loginModal = modal;
      if(!loginDetails.token()) {
        that.loginModal.show();
      }
    });
    $ionicModal.fromTemplateUrl('personList/filters.html', {
      scope: $scope
    }).then(function(modal) {
      that.filtersModal = modal;
    });
    $ionicModal.fromTemplateUrl('menu-slide/organizationPicker.html', {
      scope: $scope
    }).then(function(modal) {
      that.orgPickerModal = modal;
    });

    that.closeLogin = function() {
      that.loginModal.hide();
    };

    $scope.login = function() {
      that.loginModal.show();
    };

    that.openFilters = function() {
      that.filtersModal.show();
    };
    $scope.closeFilters = function() {
      that.filtersModal.hide();
    };
    $scope.closeOrgPicker = function() {
      that.orgPickerModal.hide();
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
            if(userData && userData.authResponse && userData.authResponse.accessToken) {
              loginDetails.token(userData.authResponse.accessToken);
              that.closeLogin();
            }
          },
          function(message) {
            alert('Could not login: '+message)
          });
      }
    };

    that.facebookLogout = function() {
      if(window.facebookConnectPlugin) {
        facebookConnectPlugin.logout(
          function() {
            loginDetails.token('');
            that.login();
          },
          function(message) {
            alert('Could not logout: '+message)
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


