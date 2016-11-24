var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class PickupController {
    constructor($rootScope, $ionicPopup, $state, $timeout, $ionicLoading, ParkingService) {
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.ParkingService = ParkingService;
        this.$timeout = $timeout;
        this.$ionicLoading = $ionicLoading;
        this.getOutCars();
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
    CommitOutCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.showLoading();
            let res = yield this.ParkingService.CommitOutCar(aStockCode, aPlateNo);
            console.log(res);
            let code = yield this.ParkingService.checkOutCarStatus(aStockCode, aPlateNo);
            this.getOutCars();
            this.hideLoading();
            if (code === 9) {
                this.$ionicPopup.alert({ title: "取车成功" });
            }
            else {
                this.$ionicPopup.alert({ title: "取车失败" });
            }
            ;
        });
    }
    ;
    getOutCars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.$rootScope.isLogin) {
                    this.showLoading();
                    var plates = [];
                    for (let v of this.$rootScope.currentUser.vehicles) {
                        plates.push({ "aPlateNo": v.plate });
                    }
                    ;
                    var cs = yield this.ParkingService.GetOutCars(plates);
                    this.cars = cs.filter((c) => { return (c.oKFlag != CarFlag.success); });
                }
                else {
                    this.$ionicPopup.alert({
                        title: "取车前请先登录或者注册"
                    });
                    this.$state.go("tab.account");
                }
            }
            catch (err) {
                this.$ionicPopup.alert({
                    title: err
                });
            }
            finally {
                this.hideLoading();
            }
            ;
        });
    }
    ;
    refresh() {
        this.getOutCars();
        this.$ionicPopup.alert({ title: "刷新成功" });
    }
    ;
}
angular.module('starter.controllers')
    .controller('FeeCtrl', PickupController);
//# sourceMappingURL=feeCtrl.js.map