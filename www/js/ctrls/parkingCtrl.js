var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class ParkingController {
    constructor($scope, $rootScope, $ionicPopup, $state, $timeout, $ionicLoading, ParkingService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.ParkingService = ParkingService;
        this.$timeout = $timeout;
        this.$ionicLoading = $ionicLoading;
        this.GetInCars();
    }
    showLoading() {
        this.$ionicLoading.show({
            template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
            duration: 100000
        });
    }
    ;
    hideLoading() {
        this.$ionicLoading.hide();
    }
    ;
    CommitInCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.showLoading();
            yield this.ParkingService.CommitInCar(aStockCode, aPlateNo);
            let code = yield this.ParkingService.checkInCarStatus(aStockCode, aPlateNo);
            this.GetInCars();
            this.hideLoading();
            if (code === 9) {
                this.$ionicPopup.alert({ title: "停车成功" });
            }
            else {
                this.$ionicPopup.alert({ title: "停车失败" });
            }
            ;
        });
    }
    ;
    refresh() {
        this.GetInCars();
        this.$ionicPopup.alert({ title: "刷新成功" });
    }
    ;
    GetInCars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.$rootScope.isLogin) {
                    this.showLoading();
                    var plates = [];
                    for (let v of this.$rootScope.currentUser.vehicles) {
                        var p = new GetCarsParam();
                        p.aPlateNo = v.plate;
                        plates.push(p);
                    }
                    ;
                    var cs = yield this.ParkingService.GetInCars(plates);
                    this.cars = cs.filter((c) => { return (c.oKFlag != CarFlag.success); });
                    this.hideLoading();
                }
                else {
                    this.$ionicPopup.alert({
                        title: "停车前请先登录或者注册"
                    });
                    this.$state.go("tab.account");
                }
            }
            catch (err) {
                this.$ionicPopup.alert({
                    title: err
                });
            }
            ;
        });
    }
    ;
}
angular.module('starter.controllers')
    .controller('ParkingCtrl', ParkingController);
//# sourceMappingURL=parkingCtrl.js.map