


class PickupController {
	private $rootScope: IParkingRootScope;
	private $ionicPopup: ionic.popup.IonicPopupService;
	private $state: ng.ui.IStateService;
	private $timeout: ng.ITimeoutService;
	private $ionicLoading: ionic.loading.IonicLoadingService
	private ParkingService: ParkingService;
	private $ionicHistory:ionic.navigation.IonicHistoryService;

	constructor($rootScope: any, $ionicPopup: any, $state: any,$ionicHistory:any, $timeout: any, $ionicLoading: any, ParkingService: any) {
		//console.log("ResetPasswordController constructor is called");
		this.$rootScope = $rootScope;
		this.$ionicPopup = $ionicPopup;
		this.$state = $state;
		this.ParkingService = ParkingService;
		this.$timeout = $timeout;
		this.$ionicLoading = $ionicLoading;
		this.$ionicHistory=$ionicHistory;
        
		if (!this.$rootScope.isLogin){
			this.$state.go('tab.login');
			return;
		};
		if (this.$rootScope.currentUser.vehicles.length===0){
			this.$state.go("tab.bindVehicle_fee");
			return;
		};
		this.plates = [];
		for (let v of this.$rootScope.currentUser.vehicles) {
			var p = new GetCarsParam();
			p.aPlateNo = v.plate;
			this.plates.push(p);
		};

		this.getOutCars();
		this.loopRefresh();
	}

	cars: CarState[];
	plates: GetCarsParam[];
	userIsCommiting: boolean = false;

	showLoading() {
		this.$ionicLoading.show({
			template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
			duration: 30000
		});
	};
	hideLoading() {
		this.$ionicLoading.hide();
	};

	async loopRefresh() {
		while (true) {
			//console.log(this.$state.current.name);
			if (this.$state.current.name !== 'tab.fee') break;
			if (!this.userIsCommiting) {
				var cs = await this.ParkingService.GetOutCars(this.plates);
				if (cs===null)break;
				this.cars = cs.filter((c) => { return (c.oKFlag != CarFlag.success) });
			}
			await this.ParkingService.delay(1000);
		};
	}

	async CommitOutCar(aStockCode: string, aPlateNo: string) {
		this.userIsCommiting = true;
		this.showLoading();
		let res = await this.ParkingService.CommitOutCar(aStockCode, aPlateNo);
		console.log(res);
		let code = await this.ParkingService.checkOutCarStatus(aStockCode, aPlateNo);
		this.getOutCars();
		this.hideLoading();
		if (code === CarFlag.success) {
			this.$ionicPopup.alert({ title: "取车成功" });
		} else {
			this.$ionicPopup.alert({ title: "取车失败" });
		};
		this.userIsCommiting = false;
	};

	async getOutCars() {

		try {
			if (this.$rootScope.isLogin) {
				this.showLoading();
				var cs = await this.ParkingService.GetOutCars(this.plates);
				this.cars = cs.filter((c) => { return (c.oKFlag != CarFlag.success) });
				//console.log(this.cars);
				//$scope.$apply();
			} else {
				this.$ionicPopup.alert({
					title: "取车前请先登录或者注册"
				});
				this.$state.go("tab.account");
				//$ionicPopup.alert({title:"ok"});
			}
		} catch (err) {
			// this.$ionicPopup.alert({
			// 	title: "网络错误"
			// });
		} finally {
			this.hideLoading();
		};

	};

	// refresh() {
	// 	this.getOutCars();
	// 	this.$ionicPopup.alert({ title: "刷新成功" });
	// };
}

angular.module('starter.controllers')
	.controller('FeeCtrl', PickupController);
