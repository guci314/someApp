// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'LocalStorageModule', 'starter.controllers', 'starter.services'])
  .constant('appConfig', {
    serverPath: 'http://localhost:8081/api/'
  })
  .run(function($ionicPlatform, $rootScope, localStorageService) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      $rootScope.$watch('currentUser', function() {
        localStorageService.set('currentUser', $rootScope.currentUser);
      }, true);

      var u = localStorageService.get('currentUser');
      if (u) {
        $rootScope.currentUser = u;
        $rootScope.isLogin = true;
      }
      //$rootScope.phoneNumber=3;
      //$rootScope.isLogin=true;
      //$rootScope.isLogin=function(){
      //  return $rootScope.phoneNumber==null;  
      //};
      //$rootScope.$on('user.DidLogin', function (event, args) {
      //    $state.go('tab.dash');
      //});
    })
  })

.factory('AuthInterceptor', [function() {  
    return {
    // Send the Authorization header with each request
        'request': function(config) {
            config.headers = config.headers || {};
            var encodedString = btoa("guci:123");
            //config.headers.common['Access-Control-Allow-Origin']='*';
            //config.headers.useXDomain = true;
            //config.headers.common = {Access-Control-Allow-Credentials: true};
            //config.headers.common['Access-Control-Allow-Origin'] = '*';
            config.headers.Authorization = 'Basic '+encodedString;
            //config.headers.Authorization = 'Basic ' + 'guci' + ':' + '123';
            console.log(config);
           return config;
        }
    };
}])

.config(['$httpProvider', function($httpProvider) {
    // var encodedString = btoa("guci:123");
    // $httpProvider.defaults.headers.common.Authorization = 'Basic '+encodedString;
    //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //$httpProvider.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    $httpProvider.interceptors.push('AuthInterceptor');
  }])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  

  // Each tab has its own nav history stack:

  .state('tab.parking', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/parking.html',
        controller: 'ParkingCtrl'
      }
    }
  })

  .state('tab.fee', {
      url: '/fee',
      views: {
        'tab-fee': {
          templateUrl: 'templates/tab-fee.html',
          controller: 'FeeCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-fee': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.test', {
    url: '/test',
    views: {
      'tab-test': {
        templateUrl: 'templates/tab-test.html',
        controller: 'TestCtrl'
      }
    }
  })

  .state('tab.layouttest', {
    url: '/test/layouttest',
    views: {
      'tab-test': {
        templateUrl: 'templates/layouttest.html',
        controller: 'TestCtrl'
      }
    }
  })

  .state('tab.register', {
    url: '/account/register',
    views: {
      'tab-account': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  .state('tab.licence', {
    url: '/licence',
    views: {
      'tab-account': {
        templateUrl: 'templates/licence.html'
      }
    }
  })

  .state('tab.login', {
    url: '/account/login',
    views: {
      'tab-account': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('tab.account-detail', {
    url: '/account/account-detail',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-detail.html',
        controller: 'Account-detailCtrl'
      }
    }
  })

  .state('tab.changePassword', {
    url: '/account/changePassword',
    views: {
      'tab-account': {
        templateUrl: 'templates/changePassword.html',
        controller: 'ChangePasswordCtrl'
      }
    }
  })

  .state('tab.bindVehicle', {
    url: '/account/bindVehicle',
    views: {
      'tab-account': {
        templateUrl: 'templates/bindVehicle.html',
        controller: 'BindVehicleCtrl'
      }
    }
  })

  .state('tab.wallet', {
    url: '/account/wallet',
    views: {
      'tab-account': {
        templateUrl: 'templates/wallet.html',
        controller: 'WalletCtrl'
      }
    }
  })

  .state('tab.aboutus', {
    url: '/account/aboutus',
    views: {
      'tab-account': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  });

  //                    .state('tab.register', {
  //                        url: '/account/register',
  //                        templateUrl: 'templates/register.html',
  //                        //controller: 'TestCtrl'
  //                        }
  //                    );

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});