var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class ParkingRecordController {
    constructor($scope, $rootScope, $ionicPopup, $ionicLoading, ParkingService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.ParkingService = ParkingService;
        this.$ionicLoading = $ionicLoading;
        this.sync();
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$rootScope.isLogin) {
                this.$ionicLoading.show({
                    template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
                    duration: 100000
                });
                var plates = [];
                for (let v of this.$rootScope.currentUser.vehicles) {
                    var p = new GetCarsParam();
                    p.aPlateNo = v.plate;
                    plates.push(p);
                }
                ;
                this.records = yield this.ParkingService.getParkingRecords(plates);
                this.$ionicLoading.hide();
            }
        });
    }
    ;
}
angular.module('starter.controllers')
    .controller('ParkingRecordCtrl', ParkingRecordController);
//# sourceMappingURL=parkingRecordCtrl.js.map