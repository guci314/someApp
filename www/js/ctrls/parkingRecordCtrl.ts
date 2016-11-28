
class ParkingRecordController {
	private $rootScope: IParkingRootScope;
	private $ionicPopup: ionic.popup.IonicPopupService;
	private $ionicLoading: ionic.loading.IonicLoadingService
	private ParkingService: ParkingService;
	private $scope: ng.IScope;

	constructor($scope: any, $rootScope: any, $ionicPopup: any, $ionicLoading: any, ParkingService: any) {
		//console.log("ResetPasswordController constructor is called");
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$ionicPopup = $ionicPopup;
		this.ParkingService = ParkingService;
		this.$ionicLoading = $ionicLoading;
        this.sync();
	}

	records: CarState[];

	async sync() {
		if (this.$rootScope.isLogin) {
			this.$ionicLoading.show({
				template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
			var plates: GetCarsParam[] = [];
			for (let v of this.$rootScope.currentUser.vehicles) {
				var p = new GetCarsParam();
				p.aPlateNo = v.plate;
				plates.push(p);
			};
			this.records = await this.ParkingService.getParkingRecords(plates);
			//this.$scope.$apply();
			this.$ionicLoading.hide();
		}
	};
}

angular.module('starter.controllers')
	.controller('ParkingRecordCtrl', ParkingRecordController);
