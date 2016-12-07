// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'LocalStorageModule', 'starter.controllers', 'starter.services', 'ngResource', 'ngCordova'])
    .constant('appConfig', {
    serverPath: 'http://183.239.167.94:8083/api/',
    //serverPath: 'http://localhost:8083/api/',
    //updateUrl: 'http://192.168.1.110:8080/',
    updateUrl: 'http://183.239.167.94:8082/',
    carServicePath: 'http://183.239.167.94:8084/api/'
})
    .run(function ($ionicPlatform, $state, $ionicHistory, $location, $ionicPopup, $timeout, $http, $cordovaAppVersion, appConfig, $rootScope, localStorageService, $cordovaSplashscreen, RegisterService, UpdateService) {
    $ionicPlatform.ready(function () {
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
        //主页面显示退出提示框
        $ionicPlatform.registerBackButtonAction(function (e) {
            e.preventDefault();
            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    }
                    else {
                    }
                });
            }
            // Is there a page to go back to?
            if ($location.path() == '/tab/account' || $location.path() == '/tab/fee' || $location.path() == '/tab/dash') {
                showConfirm();
            }
            else {
                if ($ionicHistory.viewHistory().backView) {
                    $ionicHistory.viewHistory().backView.go();
                }
                else {
                    // This is the last page: Show confirmation popup
                    showConfirm();
                }
                return false;
            }
        }, 101);
        $rootScope.$on('networkError', function (event, data) {
            $ionicPopup.alert({ title: data });
        });
        $rootScope.$watch('currentUser', function () {
            localStorageService.set('currentUser', $rootScope.currentUser);
        }, true);
        var u = localStorageService.get('currentUser');
        if (u) {
            $rootScope.currentUser = u;
            //从服务器更新用户数据
            RegisterService.getUserByPhoneNumber(u.phoneNumber).then((user) => {
                if ((user !== null) && (user !== undefined)) {
                    $rootScope.currentUser = user;
                    $rootScope.isLogin = true;
                }
            });
        }
        //检测新版本
        let isIPad = ionic.Platform.isIPad();
        let isIOS = ionic.Platform.isIOS();
        let isAndroid = ionic.Platform.isAndroid();
        if (isIPad || isIOS || isAndroid) {
            //$ionicPlatform.
            UpdateService.checkNewVersion().then(newVersion => {
                if (newVersion)
                    UpdateService.install();
            });
        }
        // $cordovaSplashScreen.hide();
    });
})
    .service('AuthInterceptor', function ($rootScope) {
    var service = this;
    // Send the Authorization header with each request
    service.request = function (config) {
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
            }
        }
        return config;
    };
    service.responseError = function (response) {
        // if (response.status === 401) {
        //   $rootScope.$broadcast('unauthorized');
        // }
        $rootScope.$broadcast("networkError", "网络错误");
        return response;
    };
    //}
    //'':function(){}
})
    .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            request: function (config) {
                config.timeout = 5000;
                return config;
            },
            responseError: function (rejection) {
                switch (rejection.status) {
                    case 408:
                        alert({ title: "连接服务器超时" });
                        break;
                }
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('AuthInterceptor');
})
    .config(function ($stateProvider, $httpProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.navBar.alignTitle('left');
    $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
        .state('tab.parking', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/parking.html',
                controller: 'ParkingCtrl',
                controllerAs: 'ctrl'
            }
        }
    })
        .state('tab.fee', {
        cache: false,
        url: '/fee',
        views: {
            'tab-fee': {
                templateUrl: 'templates/tab-fee.html',
                controller: 'FeeCtrl',
                controllerAs: 'ctrl'
            }
        }
    })
        .state('tab.parkingRecord', {
        url: '/parkingRecord',
        views: {
            'tab-account': {
                templateUrl: 'templates/parkingRecord.html',
                controller: 'ParkingRecordCtrl1',
                controllerAs: 'ctrl'
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
                controller: 'RegisterCtrl',
                controllerAs: 'ctrl'
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
                controller: 'LoginCtrl',
                controllerAs: 'ctrl'
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
                controller: 'BindVehicleCtrl',
                controllerAs: 'ctrl'
            }
        }
    })
        .state('tab.bindVehicle_fee', {
        url: '/fee_bindVehicle',
        views: {
            'tab-fee': {
                templateUrl: 'templates/bindVehicle.html',
                controller: 'BindVehicleCtrl',
                controllerAs: 'ctrl'
            }
        }
    })
        .state('tab.bindVehicle_dash', {
        url: '/dash_bindVehicle',
        views: {
            'tab-dash': {
                templateUrl: 'templates/bindVehicle.html',
                controller: 'BindVehicleCtrl',
                controllerAs: 'ctrl'
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
        .state('tab.resetPassword', {
        url: '/account/resetPassword',
        views: {
            'tab-account': {
                templateUrl: 'templates/resetPassword.html',
                controller: 'ResetPasswordCtrl',
                controllerAs: 'ctrl'
            }
        }
    })
        .state('tab.aboutus', {
        url: '/aboutus',
        views: {
            'tab-account': {
                templateUrl: 'templates/aboutus.html',
                controller: 'AboutusCtrl'
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
});
//# sourceMappingURL=app.js.map