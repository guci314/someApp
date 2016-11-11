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

.controller('AccountCtrl', function($scope, $rootScope, $ionicPlatform,$ionicModal, $ionicPopup, $http, $httpParamSerializer, $cordovaAppVersion, $cordovaFileTransfer, appConfig) {
    $scope.update = () => {
        $ionicPlatform.ready(function() {
            //检查更新
            $http.get(appConfig.updateUrl + 'version.json').then((res) => {
                var newVersion = res.data.version;
                $cordovaAppVersion.getVersionNumber().then(function(version) {
                    if (newVersion != version) {
                        var confirm = $ionicPopup.confirm({
                            title: "发现新版本",
                            template: "现在立即更新吗?",
                            okText: "确定",
                            cancelText: "取消"
                        });
                        confirm.then(function(res) {
                            if (res) {
                                var url = appConfig.updateUrl + "android-debug.apk";
                                var filename = url.split("/").pop();
                                //documentsDirectory externalDataDirectory externalRootDirectory + 'Pictures/' dataDirectory applicationDirectory
                                var targetPath = cordova.file.externalDataDirectory + filename;
                                $ionicModal.fromTemplateUrl('templates/progressModal.html', {
                                    scope: $scope,
                                    backdropClickToClose: false,
                                    hardwareBackButtonClose: false
                                }).then(function(modal) {
                                    $scope.progressModal = modal;
                                    $scope.progressModal.show();
                                    //$scope.showProgress=true;
                                    $cordovaFileTransfer.download(url, targetPath, {}, true)
                                        .then(function(result) {
                                                $scope.hasil = 'Save file on ' + targetPath + ' success!';
                                                $scope.progressModal.hide();
                                                //$scope.showProgress=false;
                                                window.plugins.webintent.startActivity({
                                                        action: window.plugins.webintent.ACTION_VIEW,
                                                        url: targetPath,
                                                        type: 'application/vnd.android.package-archive' //'text/plain' //'application/vnd.android.package-archive'
                                                    },
                                                    function() {},
                                                    function(e) {
                                                        alert('安装程序发生错误');
                                                    }
                                                );
                                            },
                                            function(error) {
                                                //alert(JSON.stringify(error));
                                                $scope.hasil = '下载文件发生错误';
                                            },
                                            function(progress) {
                                                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                            });
                                });


                            };
                        });
                    } else {
                        $ionicPopup.alert({
                            title: 当前已是最新版本
                        });
                    };
                });
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