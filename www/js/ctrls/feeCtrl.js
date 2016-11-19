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
            template: '<p>正在取车,请稍候...</p><ion-spinner></ion-spinner>',
            duration: 100000
        });
    };
    var hideLoading = function () {
        $ionicLoading.hide();
    };
    var checkCarStatus = () => __awaiter(this, void 0, void 0, function* () {
        this.stopQuery = false;
        $timeout(() => { this.stopQuery = true; }, 3000);
        while (!this.stopQuery) {
            this.queryResult = yield ParkingService.GetOutCar(this.phone, this.plateNo);
            console.log(this.queryResult);
            if ((this.queryResult.oKFlag === 2) || (this.queryResult.oKFlag === 9)) {
                break;
            }
            else {
                yield delay(1000);
            }
            ;
        }
        ;
    });
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    this.stopQuery = false;
    this.queryResult = null;
    this.phone = "";
    this.plateNo = "";
    $scope.CommitOutCar = (aPlateNo) => __awaiter(this, void 0, void 0, function* () {
        showLoading();
        let res = yield ParkingService.CommitOutCar($rootScope.currentUser.phoneNumber, aPlateNo);
        console.log(res);
        this.phone = res.phone;
        this.plateNo = res.plateNo;
        yield checkCarStatus();
        hideLoading();
        if (this.queryResult.oKFlag === 9) {
            $ionicPopup.alert({ title: "取车成功" });
        }
        else {
            $ionicPopup.alert({ title: "取车失败" });
        }
        ;
    });
    this.queryFee = function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ($rootScope.isLogin) {
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
            ;
        });
    };
    this.queryFee();
});
//# sourceMappingURL=feeCtrl.js.map