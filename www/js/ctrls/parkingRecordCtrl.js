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
        this.records = [];
        this.pageNumber = 0;
        this.plates = [];
        this.noMoreItemsAvailable = false;
        //console.log("ResetPasswordController constructor is called");
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.ParkingService = ParkingService;
        this.$ionicLoading = $ionicLoading;
        for (let v of this.$rootScope.currentUser.vehicles) {
            var p = new GetCarsParam();
            p.aPlateNo = v.plate;
            this.plates.push(p);
        }
        ;
        // this.$scope.$on('$stateChangeSuccess', ()=>{
        // 	this.$scope.loadMore();
        // });
        this.loadFirstPage();
    }
    loadMore() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pageNumber = this.pageNumber + 1;
            console.log("loadMore,page number:" + this.pageNumber);
            if (this.pageNumber > 10)
                this.noMoreItemsAvailable = true;
            // let recs = await this.ParkingService.getRecordsByPageNo(this.pageNumber,10,this.plates);
            // this.records = this.records.concat(recs);
            // console.log("recorder size:" + this.records.length.toString());
            this.$scope.$broadcast('scroll.infiniteScrollComplete');
            // if (recs.length ===0 ) this.noMoreItemsAvailable=true;
        });
    }
    ;
    loadFirstPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.$rootScope.isLogin) {
                this.$ionicLoading.show({
                    template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
                    duration: 20000
                });
                this.records = yield this.ParkingService.getRecordsByPageNo(this.pageNumber, 10, this.plates);
                //this.$scope.$apply();
                this.$ionicLoading.hide();
            }
        });
    }
    ;
}
angular.module('starter.controllers')
    .controller('ParkingRecordCtrl', ParkingRecordController);
//# sourceMappingURL=parkingRecordCtrl.js.map