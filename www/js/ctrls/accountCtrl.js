///<reference path="../../../typings/tsd.d.ts"/>
angular.module('starter.controllers')

    .controller('AccountCtrl',
    /**
     * @param {angular.IHttpService} $http
     * @param {angular.IScope} $scope
     * @param {angular.IRootScopeService} $rootScope
     * @param {angular.IQService} $q
     * @param {ionic.popup.IonicPopupService} $ionicPopup
     */
    function ($scope, $q, $rootScope, $ionicPlatform, $ionicModal, $ionicPopup, $http, $httpParamSerializer, $cordovaAppVersion, $cordovaFileTransfer, appConfig) {

        $scope.currentPlatform = ionic.Platform.platform();

        function createRejectPromise(message) {
            var defer = $q.defer();
            defer.reject(message);
            return defer.promise;
        }

        $scope.update = () => {
            $ionicPlatform.ready(function () {
                //检查更新


                var getServerVersion = function () {
                    return $http.get(appConfig.updateUrl + 'version.json' + "?ts=" + Date.now(), {
                        cache: false
                    }).then((v) => {
                        $scope.serverVersion = v.data.version;
                        if ($scope.serverVersion === null) {
                            return createRejectPromise("无法连接更新服务器");
                            //throw new Error("无法连接更新服务器");
                        }
                    }).catch((err) => {
                        return createRejectPromise("无法连接更新服务器");
                        //throw new Error("无法连接更新服务器");
                    });
                };

                var getLocalVersion = function () {
                    return $cordovaAppVersion.getVersionNumber()
                        .then((v) => {
                            $scope.localVersion = v;
                        });
                };

                var confirm = () => {
                    return $ionicPopup.confirm({
                        title: "发现新版本",
                        template: "现在立即更新吗?",
                        okText: "确定",
                        cancelText: "取消"
                    }).then((x) => {
                        if (!x) {
                            return createRejectPromise("取消安装");
                            //throw new Error("安装取消");
                        }
                    });
                };

                var createModalWindow = function () {
                    return $ionicModal.fromTemplateUrl('templates/progressModal.html', {
                        scope: $scope,
                        backdropClickToClose: true,
                        hardwareBackButtonClose: true
                    }).then((modal) => {
                        $scope.progressModal = modal;
                        return true;
                    });

                };

                var download = function () {
                    $scope.url = appConfig.updateUrl + "szwchyCar.apk";
                    var filename = $scope.url.split("/").pop();
                    //externalDataDirectory documentsDirectory .cacheDirectory applicationStorageDirectory externalRootDirectory + 'Pictures/' dataDirectory applicationDirectory
                    $scope.targetPath = null;
                    if (cordova.file.externalDataDirectory !== null) {
                        $scope.targetPath = cordova.file.externalDataDirectory + filename;
                    } else {
                        $scope.targetPath = cordova.file.dataDirectory + filename;
                    }
                    return new Promise(function (fulfill, reject) {
                        $scope.progressModal.show();
                        $cordovaFileTransfer.download($scope.url, $scope.targetPath, {}, true)
                            .then((result) => {
                                //$scope.hasil = 'Save file on ' + targetPath + ' success!';
                                $scope.progressModal.hide();
                                fulfill();
                            },
                            function (error) {
                                alert(JSON.stringify(error));
                                alert('下载文件发生错误');
                                $scope.progressModal.hide();
                                //reject("下载文件发生错误");
                                return createRejectPromise("下载文件发生错误");
                                //throw new Error("下载文件发生错误");
                                //$scope.hasil = '下载文件发生错误';
                            },
                            function (progress) {
                                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                            });
                    });
                };

                var install = function () {
                    window.plugins.webintent.startActivity({
                        action: window.plugins.webintent.ACTION_VIEW,
                        url: $scope.targetPath,
                        type: 'application/vnd.android.package-archive' //'text/plain' //'application/vnd.android.package-archive'
                    },
                        function () { },
                        function (e) {
                            return createRejectPromise("安装程序发生错误");
                            //throw new Error("安装程序发生错误");
                        }
                    );
                };



                getServerVersion()
                    .then(getLocalVersion)
                    .then(() => {
                        if ($scope.serverVersion == $scope.localVersion) {
                            //throw new Error("当前已是最新版本");
                            return createRejectPromise("当前已是最新版本");
                        }
                    })
                    .then(confirm)
                    .then(createModalWindow)
                    .then(download)
                    .then(install)
                    .catch((err) => {
                        $ionicPopup.alert({
                            title: err
                        });
                    })

            });

        };

        $scope.exit = function () {
            var confirm = $ionicPopup.confirm({
                title: "确认",
                template: "你确实要退出吗?",
                okText: "确定",
                cancelText: "取消"
            }).then(function(res){
                if (res) ionic.Platform.exitApp();
            });
        };

    });