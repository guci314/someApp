// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'LocalStorageModule', 'starter.controllers', 'starter.services', 'ngResource', 'ngCordova'])
  .constant('appConfig', {
    serverPath: 'http://192.168.1.109:8081/api/',
    updateUrl: 'http://192.168.1.109:8080/'
  })
  .run(function($ionicPlatform,$state,$timeout, $http, $cordovaAppVersion, appConfig, $rootScope, localStorageService, $cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //$cordovaSplashscreen.hide();
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

      
    })
  })

.service('AuthInterceptor', function($rootScope) {

  var service = this;

  // Send the Authorization header with each request
  service.request = function(config) {
    //if (config && config.headers) {
    if ($rootScope) {
      if ($rootScope.currentUser) {
        config.headers = config.headers || {};
        var s = $rootScope.currentUser.phoneNumber + ":" + $rootScope.currentUser.password;
        var encodedString = btoa(s);
        //config.headers.common['Access-Control-Allow-Origin']='*';
        //config.headers.useXDomain = true;
        //config.headers.common = {Access-Control-Allow-Credentials: true};
        //config.headers.common['Access-Control-Allow-Origin'] = '*';
        config.headers.Authorization = 'Basic ' + encodedString;
        //config.headers.Authorization = 'Basic ' + 'guci' + ':' + '123';
        //console.log(config);


      }
    }
    return config;
  };

  service.responseError = function(response) {
    if (response.status === 401) {
      $rootScope.$broadcast('unauthorized');
    }
    return response;
  };
  //}
  //'':function(){}

})

// .config(['$httpProvider', function($httpProvider) {
//   //$httpProvider.interceptors.push('AuthInterceptor');
// }])

.config(function($stateProvider, $httpProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('后退');

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
    cache: false,
    url: '/fee',
    views: {
      'tab-fee': {
        templateUrl: 'templates/tab-fee.html',
        controller: 'FeeCtrl'
      }
    }
  })

  .state('tab.parkingRecord', {
    url: '/parkingRecord',
    views: {
      'tab-account': {
        templateUrl: 'templates/parkingRecord.html',
        controller: 'ParkingRecordCtrl'
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

  .state('tab.message', {
    url: '/message',
    views: {
      'tab-account': {
        templateUrl: 'templates/message.html',
        controller: 'MessageCtrl'
      }
    }
  })

  .state('tab.message-detail', {
    url: '/message/:messageId',
    views: {
      'tab-account': {
        templateUrl: 'templates/message-detail.html',
        controller: 'MessageDetailCtrl'
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

  .state('tab.walletDetail', {
    url: '/account/walletDetail',
    views: {
      'tab-account': {
        templateUrl: 'templates/walletDetail.html'
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
  $urlRouterProvider.otherwise('/tab/account');
  $httpProvider.interceptors.push('AuthInterceptor');
});