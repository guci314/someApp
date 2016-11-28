///<reference path="../../../typings/tsd.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// interface IParkingScope extends ng.IScope {
// 	CommitInCar: any;
// 	refresh: any;
// 	GetInCars: any;
// 	cars: InCarState[];
// };
class ParkingController {
    constructor($scope, $rootScope, $ionicPopup, $state, $timeout, $ionicLoading, ParkingService) {
        this.userIsCommiting = false;
        //console.log("ResetPasswordController constructor is called");
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.ParkingService = ParkingService;
        this.$timeout = $timeout;
        this.$ionicLoading = $ionicLoading;
        if (!this.$rootScope.isLogin) {
            this.$state.go('tab.login');
            return;
        }
        ;
        if (this.$rootScope.currentUser.vehicles.length === 0) {
            this.$state.go('tab.bindVehicle_dash');
            return;
        }
        ;
        this.plates = [];
        for (let v of this.$rootScope.currentUser.vehicles) {
            var p = new GetCarsParam();
            p.aPlateNo = v.plate;
            this.plates.push(p);
        }
        ;
        this.GetInCars();
        this.loopRefresh();
    }
    showLoading() {
        this.$ionicLoading.show({
            template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
            duration: 30000
        });
    }
    ;
    hideLoading() {
        this.$ionicLoading.hide();
    }
    ;
    loopRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                //console.log(this.$state.current.name);
                if (this.$state.current.name !== 'tab.parking')
                    break;
                if (!this.userIsCommiting) {
                    var cs = yield this.ParkingService.GetInCars(this.plates);
                    if (cs === null)
                        break;
                    this.cars = cs.filter((c) => { return (c.oKFlag != CarFlag.success); });
                }
                yield this.ParkingService.delay(1000);
            }
            ;
        });
    }
    CommitInCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userIsCommiting = true;
            this.showLoading();
            yield this.ParkingService.CommitInCar(aStockCode, aPlateNo);
            //console.log(res);
            let code = yield this.ParkingService.checkInCarStatus(aStockCode, aPlateNo);
            this.GetInCars();
            this.hideLoading();
            if (code === CarFlag.success) {
                this.$ionicPopup.alert({ title: "停车成功" });
            }
            else {
                this.$ionicPopup.alert({ title: "停车失败" });
            }
            ;
            this.userIsCommiting = false;
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
                    var cs = yield this.ParkingService.GetInCars(this.plates);
                    if (cs !== null) {
                        this.cars = cs.filter((c) => { return (c.oKFlag != CarFlag.success); });
                    }
                }
                else {
                    this.$ionicPopup.alert({
                        title: "停车前请先登录或者注册"
                    });
                    this.$state.go("tab.account");
                }
            }
            catch (err) {
            }
            finally {
                this.hideLoading();
            }
            ;
        });
    }
    ;
}
angular.module('starter.controllers')
    .controller('ParkingCtrl', ParkingController);
//# sourceMappingURL=parkingCtrl.js.map