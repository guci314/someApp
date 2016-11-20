///<reference path="../../../typings/tsd.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class InCarState {
}
;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
angular.module('starter.controllers')
    .controller('ParkingCtrl', function ($scope, $rootScope, $timeout, $q, $state, $ionicLoading, $ionicPopup, $ionicModal, localStorageService, ParkingService) {
    var showLoading = function () {
        $ionicLoading.show({
            template: '<p>正在停车,请稍候...</p><ion-spinner></ion-spinner>',
            duration: 100000
        });
    };
    var hideLoading = function () {
        $ionicLoading.hide();
    };
    function checkCarStatus(phone, plateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var stopQuery = false;
            var queryResult;
            $timeout(() => { stopQuery = true; }, 3000);
            while (!stopQuery) {
                queryResult = yield ParkingService.GetInCar(phone, plateNo);
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
    }
    ;
    $scope.CommitInCar = (aPlateNo) => __awaiter(this, void 0, void 0, function* () {
        showLoading();
        let res = yield ParkingService.CommitInCar($rootScope.currentUser.phoneNumber, aPlateNo);
        console.log(res);
        let code = yield checkCarStatus(res.phone, res.plateNo);
        console.log("get rerult");
        console.log(code);
        hideLoading();
        if (code === 9) {
            $ionicPopup.alert({ title: "停车成功" });
        }
        else {
            $ionicPopup.alert({ title: "停车失败" });
        }
        ;
    });
    $scope.refresh = function () {
        $scope.GetInCars();
        $ionicPopup.alert({ title: "刷新成功" });
    };
    $scope.GetInCars = function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ($rootScope.isLogin) {
                    $scope.cars = yield ParkingService.GetInCars($rootScope.currentUser.phoneNumber);
                    $scope.$apply();
                }
                else {
                    $ionicPopup.alert({
                        title: "停车前请先登录或者注册"
                    });
                    $state.go("tab.account");
                }
            }
            catch (err) {
                $ionicPopup.alert({
                    title: err
                });
            }
            ;
        });
    };
    $scope.GetInCars();
});
//# sourceMappingURL=parkingCtrl.js.map