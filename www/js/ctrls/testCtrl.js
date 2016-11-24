var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
angular.module('starter.controllers')
    .controller('TestCtrl', function ($scope, $q, $ionicLoading, $timeout, $rootScope, $ionicPopup, $http, $httpParamSerializer, $cordovaFileTransfer, RegisterService, VehicleService) {
    $scope.addTestAccount = function () {
        var handleResponse = function (data) {
            var alertPopup = $ionicPopup.alert({
                title: '完成'
            });
        };
        var phoneNumber = '18674048896';
        var validCode = '111';
        var password = '11111';
        var p = RegisterService.register(phoneNumber, validCode, password);
        p.then(function (res) {
            var p1 = RegisterService.changeUserName(phoneNumber, 'testUser');
            p1.then(function (res1) {
                VehicleService.bindPlate('18674048896', 'aaa', true);
                VehicleService.bindPlate('18674048896', 'bbb', true);
                VehicleService.bindPlate('18674048896', 'c', false);
            });
        });
    };
    $scope.test = function () {
        RegisterService.getUserByPhoneNumber('18674048896').then(function (res) {
            $ionicPopup.alert({
                title: JSON.stringify(res)
            });
        });
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
            data: $httpParamSerializer({
                username: "18674048895",
                password: "11111"
            })
        }).then(function (res) {
            console.log(res);
        });
    };
    $scope.test1 = function () {
        var x = {
            "gg": "adff",
            "dd": "fgfgfg"
        };
        alert(JSON.stringify(x));
        alert(window);
    };
    $scope.myValue = 0;
    function addOne(x) {
        var defer = $q.defer();
        $timeout(() => {
            defer.resolve(x + 1);
        }, 5000);
        return defer.promise;
    }
    function step1(v) {
        var defer = $q.defer();
        $scope.myValue = v;
        console.log("step1");
        if (v) {
            $timeout(() => {
                var x = v + 1;
                $scope.myValue = x;
                defer.resolve(x);
            }, 5000);
        }
        else {
            $timeout(() => {
                defer.reject("error from step1");
            }, 5000);
        }
        ;
        return defer.promise;
    }
    function step2(v) {
        console.log("step2");
        return $ionicPopup.confirm({
            title: "对付对付"
        }).then((x) => {
            if (x) {
                var y = v + 1;
                $scope.myValue = y;
                return 100;
            }
            else {
                return 9;
            }
        });
    }
    function step2_1(v) {
        console.log("step2_1");
        var defer = $q.defer();
        defer.reject("error from step2_1");
        return defer.promise;
    }
    function step3(v) {
        var defer = $q.defer();
        console.log("step3");
        $timeout(() => {
            var x = v + 1;
            $scope.myValue = x;
            defer.resolve(x);
        }, 5000);
        return defer.promise;
    }
    function step3_1(v) {
        console.log("step3_1");
        return v + 1000;
    }
    function step4(v) {
        var defer = $q.defer();
        console.log("step4");
        $timeout(() => {
            var x = v + 1;
            $scope.myValue = x;
            defer.resolve(x);
        }, 5000);
        return defer.promise;
    }
    function handleError(err) {
        console.log("handle error");
        console.log(err);
    }
    $scope.promiseTest = function () {
        step1(1).then(step2).then(step2_1).then((v) => {
            return v + 10;
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
        console.log("qqqqqqqqqqq");
    };
    function f2() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("f2 finished");
            return "hello world";
        });
    }
    $scope.test2 = function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("begin");
            let x = yield f2();
            console.log(x);
            console.log("end");
            var p = new InCarState();
        });
    };
});
//# sourceMappingURL=testCtrl.js.map