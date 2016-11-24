var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class BindVehicleController {
    constructor($scope, $rootScope, $ionicPopup, $state, $ionicPopover, VehicleService) {
        this.autoCharge = true;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.$ionicPopover = $ionicPopover;
        this.VehicleService = VehicleService;
        this.$ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: this.$scope
        }).then((popover) => {
            this.popover = popover;
        });
    }
    delete(id, index) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$ionicPopup.confirm({
                title: "确认删除",
                template: "你确实要删除这个车辆吗?",
                okText: "确定",
                cancelText: "取消"
            });
            if (res) {
                let x = yield this.VehicleService.deleteVehicle(id);
                if (x) {
                    this.$rootScope.currentUser.vehicles.splice(index, 1);
                    this.$scope.$apply();
                }
            }
        });
    }
    ;
    bindPlate() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var v in this.$rootScope.currentUser.vehicles) {
                if (this.$rootScope.currentUser.vehicles[v].plate == this.vehicleNumber) {
                    this.$ionicPopup.alert({
                        title: "不能重复绑定车牌号"
                    });
                    return;
                }
            }
            ;
            let res = yield this.VehicleService.bindPlate(this.$rootScope.currentUser.phoneNumber, this.vehicleNumber, this.autoCharge);
            if (res) {
                this.$ionicPopup.alert({
                    title: "绑定成功"
                });
                this.$rootScope.currentUser.vehicles.push(res);
            }
        });
    }
}
angular.module('starter.controllers')
    .controller('BindVehicleCtrl', BindVehicleController);
//# sourceMappingURL=bindVehicleCtrl.js.map