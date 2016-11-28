///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="./feeCtrl.ts"/>
///<reference path="../services/parkingService.ts"/>

interface MyScope extends ng.IScope {
    addTestAccount: any;
    test: any;
    addVehicle: any;
    security: any;
    test1: any;
    myValue: any;
    promiseTest: any;
    show: any;
    hide: any;
    loading: any;
    test2: any;
}

angular.module('starter.controllers')

    .controller('TestCtrl',
    function ($scope: MyScope, $q: ng.IQService, $ionicLoading: ionic.loading.IonicLoadingService, $timeout: ng.ITimeoutService, $rootScope: any, $ionicPopup: ionic.popup.IonicPopupService, $http: ng.IHttpService, $httpParamSerializer: ng.IHttpParamSerializer, $cordovaFileTransfer: any, RegisterService: any, VehicleService: any) {

        $scope.addTestAccount = function () {
            var handleResponse = function (data: any) {
                var alertPopup = $ionicPopup.alert({
                    title: '完成'
                });
            };

            var phoneNumber = '18674048896';
            var validCode = '111';
            var password = '11111';




            var p = RegisterService.register(phoneNumber, validCode, password);
            p.then(function (res: any) {
                var p1 = RegisterService.changeUserName(phoneNumber, 'testUser');
                p1.then(function (res1: any) {
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

        $scope.test = function () {
            RegisterService.getUserByPhoneNumber('18674048896').then(function (res: any) {
                $ionicPopup.alert({
                    title: JSON.stringify(res)
                });
            });
            //$ionicPopup.alert({ title: JSON.stringify($rootScope.currentUser) });
        };


        $scope.addVehicle = function () {


        };

        $scope.security = function () {
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
            }).then(function (res: any) {
                console.log(res);
            });
        };

        // $scope.download = function () {
        //     ionic.Platform.ready(function () {
        //         var url = "http://10.42.0.28:8080/android-debug.apk";
        //         var filename = url.split("/").pop();
        //         //documentsDirectory externalDataDirectory externalRootDirectory + 'Pictures/' dataDirectory applicationDirectory
        //         var targetPath = cordova.file.externalDataDirectory + filename;
        //         alert("cordova.file.externalDataDirectory:" + cordova.file.externalDataDirectory);
        //         alert("filename:" + filename);
        //         alert('targetPath:' + targetPath);
        //         $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
        //             $scope.hasil = 'Save file on ' + targetPath + ' success!';
        //             window.plugins.webintent.startActivity({
        //                 action: window.plugins.webintent.ACTION_VIEW,
        //                 url: targetPath,
        //                 type: 'application/vnd.android.package-archive' //'text/plain' //'application/vnd.android.package-archive'
        //             },
        //                 function () { },
        //                 function (e) {
        //                     alert('Error launching app update');
        //                 }
        //             );
        //         }, function (error) {
        //             alert(JSON.stringify(error));
        //             $scope.hasil = 'Error Download file';
        //         }, function (progress) {
        //             $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        //         });
        //     });
        // };

        $scope.test1 = function () {
            var x = {
                "gg": "adff",
                "dd": "fgfgfg"
            };
            alert(JSON.stringify(x));
            alert(window);
        };

        $scope.myValue = 0;

        function addOne(x: any) {
            var defer = $q.defer();
            $timeout(() => {
                defer.resolve(x + 1)
            }, 5000);
            return defer.promise;
        }

        function step1(v: any) {
            var defer = $q.defer();

            $scope.myValue = v;
            console.log("step1");
            if (v) {
                $timeout(() => {
                    var x = v + 1;
                    $scope.myValue = x;
                    defer.resolve(x);
                }, 5000);
            } else {
                $timeout(() => {
                    defer.reject("error from step1")
                }, 5000);
            };
            return defer.promise;
        }


        function step2(v: any) {
            //var defer = $q.defer();
            console.log("step2");
            return $ionicPopup.confirm({
                title: "对付对付"
            }).then((x: any) => {
                if (x) {
                    var y = v + 1;
                    $scope.myValue = y;
                    return 100;
                } else {
                    return 9;
                }
            });

            //return defer.promise;
        }

        function step2_1(v: any) {
            console.log("step2_1");
            //return v;
            var defer = $q.defer();
            defer.reject("error from step2_1");
            return defer.promise;
        }

        function step3(v: any) {
            var defer = $q.defer();
            console.log("step3");
            $timeout(() => {
                var x = v + 1;
                $scope.myValue = x;
                defer.resolve(x);
            }, 5000);
            return defer.promise;
        }

        function step3_1(v: any) {
            console.log("step3_1");
            return v + 1000;
        }

        function step4(v: any) {
            var defer = $q.defer();
            console.log("step4");
            $timeout(() => {
                var x = v + 1;
                $scope.myValue = x;
                defer.resolve(x);
            }, 5000);
            return defer.promise;
        }

        function handleError(err: any) {
            console.log("handle error");
            console.log(err);
        }

        $scope.promiseTest = function () {
            // addOne($scope.myValue).then((v)=>{
            //     $scope.myValue=v;
            // });
            step1(1).then(step2).then(step2_1).then((v: any) => {
                return v + 10
            }).then(step3).then(step3_1).then(step4).catch(handleError);
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
                duration: 10000
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.loading = function () {
            //$scope.show();
            //import f1 = module("");
            //hello();

            console.log("qqqqqqqqqqq");

            //$timeout($scope.hide, 3000);
        }

        async function f2(): Promise<string> {
            //await delay(3000);
            console.log("f2 finished");
            return "hello world";
        }

        $scope.test2 = async function () {
            //$ionicPopup.alert({title:"dffd"})
            console.log("begin");
            let x = await f2();
            console.log(x);
            console.log("end");
            var p = new CarState();

        };

    });