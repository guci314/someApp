///<reference path="../../../typings/tsd.d.ts" />


class PickupController {
	private $rootScope: IParkingRootScope;
	private $ionicPopup: ionic.popup.IonicPopupService;
	private $state: ng.ui.IStateService;
	private $timeout: ng.ITimeoutService;
	private $ionicLoading: ionic.loading.IonicLoadingService
	private ParkingService: ParkingService;

	constructor($rootScope: any, $ionicPopup: any, $state: any, $timeout: any, $ionicLoading: any, ParkingService: any) {
		//console.log("ResetPasswordController constructor is called");
		this.$rootScope = $rootScope;
		this.$ionicPopup = $ionicPopup;
		this.$state = $state;
		this.ParkingService = ParkingService;
		this.$timeout = $timeout;
		this.$ionicLoading = $ionicLoading;

		this.getOutCars();
	}

	cars: OutCarState[];

	showLoading() {
		this.$ionicLoading.show({
			template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
			duration: 100000
		});
	};
	hideLoading() {
		this.$ionicLoading.hide();
	};

	async CommitOutCar(aStockCode: string,aPlateNo: string) {
		this.showLoading();
		let res = await this.ParkingService.CommitOutCar(aStockCode,aPlateNo);
		console.log(res);
		let code = await this.ParkingService.checkOutCarStatus(aStockCode,aPlateNo);
		this.getOutCars();
		this.hideLoading();
		if (code === 9) {
			this.$ionicPopup.alert({ title: "取车成功" });
		} else {
			this.$ionicPopup.alert({ title: "取车失败" });
		};
	};

	async getOutCars() {

		try {
			if (this.$rootScope.isLogin) {
				this.showLoading();
				var plates:any[]=[];
				for (let v of this.$rootScope.currentUser.vehicles){
                    plates.push({"aPlateNo":v.plate});
				};
				var cs = await this.ParkingService.GetOutCars(plates);
				this.cars=cs.filter((c)=>{return (c.oKFlag != CarFlag.success)});
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
			this.$ionicPopup.alert({
				title: err
			});
		} finally {
			this.hideLoading();
		};

	};

	refresh() {
		this.getOutCars();
		this.$ionicPopup.alert({ title: "刷新成功" });
	};
}

angular.module('starter.controllers')
	.controller('FeeCtrl', PickupController);
