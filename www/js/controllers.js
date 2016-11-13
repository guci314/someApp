angular.module('starter.controllers', ['ngCordova.plugins.appVersion'])

.controller('DashCtrl', function($scope) {})

.controller('FeeCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $rootScope, $ionicPlatform, $ionicModal, $ionicPopup, $http, $httpParamSerializer, $cordovaAppVersion, $cordovaFileTransfer, appConfig) {
    $scope.update = () => {
        $ionicPlatform.ready(function() {
            //检查更新

            var getServerVersion = function() {
                return $http.get(appConfig.updateUrl + 'version.json' + "?ts=" + Date.now(), {
                    cache: false
                });
            };

            var getLocalVersion = function() {
                return $cordovaAppVersion.getVersionNumber();
            };

            var confirm = $ionicPopup.confirm({
                title: "发现新版本",
                template: "现在立即更新吗?",
                okText: "确定",
                cancelText: "取消"
            });

            var createModalWindow = function() {

                $scope.url = appConfig.updateUrl + "android-armv7-debug.apk";
                var filename = $scope.url.split("/").pop();
                //externalDataDirectory documentsDirectory .cacheDirectory applicationStorageDirectory externalRootDirectory + 'Pictures/' dataDirectory applicationDirectory
                $scope.targetPath = null;
                if (cordova.file.externalDataDirectory != null) {
                    $scope.targetPath = cordova.file.externalDataDirectory + filename;
                } else {
                    $scope.targetPath = cordova.file.dataDirectory + filename;
                };

                return $ionicModal.fromTemplateUrl('templates/progressModal.html', {
                    scope: $scope,
                    backdropClickToClose: true,
                    hardwareBackButtonClose: true
                });

            };

            var download = function() {
                return new Promise(function(fulfill, reject) {
                    $scope.progressModal.show();
                    $cordovaFileTransfer.download($scope.url, $scope.targetPath, {}, true)
                        .then((result) => {
                                //$scope.hasil = 'Save file on ' + targetPath + ' success!';
                                $scope.progressModal.hide();
                                fulfill(true);
                            },
                            function(error) {
                                alert(JSON.stringify(error));
                                alert('下载文件发生错误');
                                $scope.progressModal.hide();
                                fulfill(false);
                                //$scope.hasil = '下载文件发生错误';
                            },
                            function(progress) {
                                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                            });
                });
            };

            var install = function() {
                window.plugins.webintent.startActivity({
                        action: window.plugins.webintent.ACTION_VIEW,
                        url: $scope.targetPath,
                        type: 'application/vnd.android.package-archive' //'text/plain' //'application/vnd.android.package-archive'
                    },
                    function() {},
                    function(e) {
                        alert('安装程序发生错误');
                    }
                );
            };

            getServerVersion().then((v) => {
                $scope.serverVersion = v.data;
                return getLocalVersion();
            }).then((v) => {
                $scope.localVersion = v;
                if ($scope.serverVersion != $scope.localVersion) {
                    return confirm;
                } else {
                    $ionicPopup.alert({
                        title: "当前已是最新版本"
                    });
                    return false;
                };
            }).then((res) => {
                if (res) {
                    return createModalWindow();
                };
            }).then((modal) => {
                if (modal) {
                    $scope.progressModal = modal;
                    return download();
                };
            }).then((res) => {
                if (res) {
                    install();
                }
            });

        });

    };
})

.controller('RegisterCtrl', function($scope, $ionicPopup, $state, RegisterService) {
    $scope.getAuthcode = function() {
        $ionicPopup.alert({
            title: '验证码已发送'
        });
    };
    $scope.sendData = {
        phoneNumber: '',
        valideCode: '',
        password: ''
    };
    $scope.register = function() {
        handleResponse = function(data) {
            if (data) {
                var alertPopup = $ionicPopup.alert({
                    title: '注册成功'
                });
                $state.go('tab.account');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '注册失败'
                });
            }
        };
        handleError = (err) => {
            $ionicPopup.alert({
                title: '注册发生错误:' + err
            });
        };
        try {
            RegisterService.register($scope.sendData.phoneNumber, $scope.sendData.validCode, $scope.sendData.password)
                .then(handleResponse)
                .catch(handleError);
        } catch (err) {
            $ionicPopup.alert({
                title: 'shit'
            });
        }
    };

});