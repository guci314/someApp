///<reference path="../../../typings/tsd.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
;
function hello() {
    console.log("hello world");
}
angular.module('starter.controllers')
    .controller('FeeCtrl', function ($scope, $q, $timeout, $ionicLoading, $rootScope, $state, $ionicPopup, ParkingService) {
    var showLoading = function () {
        $ionicLoading.show({
            template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
            duration: 100000
        });
    };
    var hideLoading = function () {
        $ionicLoading.hide();
    };
    var checkCarStatus = (phone, plateNo) => __awaiter(this, void 0, void 0, function* () {
        var stopQuery = false;
        var queryResult;
        $timeout(() => { stopQuery = true; }, 20000);
        while (!stopQuery) {
            queryResult = yield ParkingService.GetOutCar(phone, plateNo);
            console.log(queryResult);
            if ((queryResult.oKFlag === 2) || (queryResult.oKFlag === 9)) {
                break;
            }
            else {
                yield delay(1000);
            }
            ;
        }
        ;
        return queryResult.oKFlag;
    });
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    $scope.CommitOutCar = (aPlateNo) => __awaiter(this, void 0, void 0, function* () {
        showLoading();
        let res = yield ParkingService.CommitOutCar($rootScope.currentUser.phoneNumber, aPlateNo);
        console.log(res);
        let code = yield checkCarStatus(res.phone, res.plateNo);
        hideLoading();
        if (code === 9) {
            $ionicPopup.alert({ title: "取车成功" });
        }
        else {
            $ionicPopup.alert({ title: "取车失败" });
        }
        ;
    });
    $scope.getOutCars = function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ($rootScope.isLogin) {
                    showLoading();
                    $scope.cars = yield ParkingService.GetOutCars($rootScope.currentUser.phoneNumber);
                    $scope.$apply();
                }
                else {
                    $ionicPopup.alert({
                        title: "取车前请先登录或者注册"
                    });
                    $state.go("tab.account");
                }
            }
            catch (err) {
                $ionicPopup.alert({
                    title: err
                });
            }
            finally {
                hideLoading();
            }
            ;
        });
    };
    $scope.getOutCars();
});
//# sourceMappingURL=feeCtrl.js.map