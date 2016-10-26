// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
        .constant('appConfig',{serverPath:'http://localhost:8081/api/'})
        .run(function ($ionicPlatform,$rootScope) {
            $ionicPlatform.ready(function () {
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

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

                    .state('tab.dash', {
                        url: '/dash',
                        views: {
                            'tab-dash': {
                                templateUrl: 'templates/tab-dash.html',
                                controller: 'DashCtrl'
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
