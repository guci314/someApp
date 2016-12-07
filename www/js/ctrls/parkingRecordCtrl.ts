
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

		for (let v of this.$rootScope.currentUser.vehicles) {
			var p = new GetCarsParam();
			p.aPlateNo = v.plate;
			this.plates.push(p);
		};


		// this.$scope.$on('$stateChangeSuccess', ()=>{
		// 	this.$scope.loadMore();
		// });
		this.loadFirstPage();
	}

    records: CarState[]=[];
	pageNumber = 0;
	plates: GetCarsParam[] = [];
	noMoreItemsAvailable: boolean=false;


	async loadMore() {
		this.pageNumber = this.pageNumber + 1;
		console.log("loadMore,page number:"+this.pageNumber);
		if (this.pageNumber>10) this.noMoreItemsAvailable=true;
		// let recs = await this.ParkingService.getRecordsByPageNo(this.pageNumber,10,this.plates);
		// this.records = this.records.concat(recs);
		// console.log("recorder size:" + this.records.length.toString());
		this.$scope.$broadcast('scroll.infiniteScrollComplete');
		// if (recs.length ===0 ) this.noMoreItemsAvailable=true;
	};

	async loadFirstPage() {
		if (this.$rootScope.isLogin) {
			this.$ionicLoading.show({
				template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
				duration: 20000
			});
			this.records = await this.ParkingService.getRecordsByPageNo(this.pageNumber,10,this.plates);
			//this.$scope.$apply();
			this.$ionicLoading.hide();
		}
	};

	// loadMore() {
	// 	this.ParkingService.getParkingRecords(this.plates).then(recs => {
	// 		this.$scope.records.concat(recs);
	// 		console.log("records length:" + this.$scope.records.length.toString());
	// 		if (this.$scope.records.length > 500) this.$scope.noMoreItemsAvailable = true;
	// 		this.$scope.$broadcast('scroll.infiniteScrollComplete');
	// 	});

	// }
}

angular.module('starter.controllers')
	.controller('ParkingRecordCtrl', ParkingRecordController);
