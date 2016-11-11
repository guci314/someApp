angular.module('starter.controllers')
    .controller('TestCtrl', function($scope, $rootScope, $ionicPopup, $http, $httpParamSerializer, $cordovaFileTransfer, RegisterService, VehicleService) {

        $scope.addTestAccount = function() {
            handleResponse = function(data) {
                var alertPopup = $ionicPopup.alert({
                    title: '完成'
                });
            };


            var phoneNumber = '18674048896';
            var validCode = '111';
            var password = '11111';


            var p = RegisterService.register(phoneNumber, validCode, password);
            p.then(function(res) {
                var p1 = RegisterService.changeUserName(phoneNumber, 'testUser');
                p1.then(function(res1) {
                    // VehicleService.bindPlate('18674048896', 'aaa', true).then(function(res) {
                    //     VehicleService.bindPlate('18674048896', 'bbb', true).then(function(res) {
                    //         VehicleService.bindPlate('18674048896', 'c', false).then(function(res) {
                    //             $ionicPopup.alert({title:"ok"});

                    //         });
                    //     });
                    // });
                    VehicleService.bindPlate('18674048896', 'aaa', true);
                    VehicleService.bindPlate('18674048896', 'bbb', true);
                    VehicleService.bindPlate('18674048896', 'c', false);
                });
            });
        };

        $scope.test = function() {
            RegisterService.getUserByPhoneNumber('18674048896').then(function(res) {
                $ionicPopup.alert({
                    title: JSON.stringify(res)
                });
            });
            //$ionicPopup.alert({ title: JSON.stringify($rootScope.currentUser) });
        };

        $scope.addVehicle = function() {


        };

        $scope.security = function() {
            $http({
                method: 'POST',
                url: "http://localhost:8081/login",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // transformRequest: function(obj) {
                //     var str = [];
                //     for (var p in obj)
                //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     return str.join("&");
                // },
                data: $httpParamSerializer({
                    username: "18674048895",
                    password: "11111"
                })
            }).then(function(res) {
                console.log(res);
            });
        };

        $scope.download = function() {
            ionic.Platform.ready(function() {
                var url = "http://10.42.0.28:8080/android-debug.apk";
                var filename = url.split("/").pop();
                //documentsDirectory externalDataDirectory externalRootDirectory + 'Pictures/' dataDirectory applicationDirectory
                var targetPath = cordova.file.externalDataDirectory  + filename;
                alert("cordova.file.externalDataDirectory:"+cordova.file.externalDataDirectory);
                alert("filename:"+filename);
                alert('targetPath:'+targetPath);
                $cordovaFileTransfer.download(url, targetPath, {}, true).then(function(result) {
                    $scope.hasil = 'Save file on ' + targetPath + ' success!';
                    window.plugins.webintent.startActivity({
                            action: window.plugins.webintent.ACTION_VIEW,
                            url: targetPath,
                            type: 'application/vnd.android.package-archive' //'text/plain' //'application/vnd.android.package-archive'
                        },
                        function() {},
                        function(e) {
                            alert('Error launching app update');
                        }
                    );
                }, function(error) {
                    alert(JSON.stringify(error));
                    $scope.hasil = 'Error Download file';
                }, function(progress) {
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                });
            });
        };

        $scope.test1 = function() {
            var x = {
                "gg": "adff",
                "dd": "fgfgfg"
            };
            alert(JSON.stringify(x));
            alert(window);
        };

    });