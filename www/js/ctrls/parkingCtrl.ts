///<reference path="../../../typings/tsd.d.ts" />

// interface IParkingScope extends ng.IScope {
// 	CommitInCar: any;
// 	refresh: any;
// 	GetInCars: any;
// 	cars: InCarState[];
// };


class ParkingController {
	private $rootScope: IParkingRootScope;
	private $ionicPopup: ionic.popup.IonicPopupService;
	private $state: ng.ui.IStateService;
	private $timeout: ng.ITimeoutService;
	private $ionicLoading: ionic.loading.IonicLoadingService
	private ParkingService: ParkingService;
	private $scope:ng.IScope;

	constructor($scope:any,$rootScope: any, $ionicPopup: any, $state: any, $timeout: any, $ionicLoading: any, ParkingService: any) {
		//console.log("ResetPasswordController constructor is called");
		this.$scope=$scope;
		this.$rootScope = $rootScope;
		this.$ionicPopup = $ionicPopup;
		this.$state = $state;
		this.ParkingService = ParkingService;
		this.$timeout = $timeout;
		this.$ionicLoading = $ionicLoading;

		this.GetInCars();
	}

	cars: InCarState[];
    //cars:any;
	//xxx="dfdfdfdfd";

	showLoading() {
		this.$ionicLoading.show({
			template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
			duration: 100000
		});
	};
	hideLoading() {
		this.$ionicLoading.hide();
	};

	async CommitInCar(aStockCode: string, aPlateNo: string) {
		this.showLoading();
		await this.ParkingService.CommitInCar(aStockCode, aPlateNo);
		//console.log(res);
		let code = await this.ParkingService.checkInCarStatus(aStockCode, aPlateNo);
		this.GetInCars();
		this.hideLoading();
		if (code === 9) {
			this.$ionicPopup.alert({ title: "停车成功" });
		} else {
			this.$ionicPopup.alert({ title: "停车失败" });
		};
	};

	refresh() {
		this.GetInCars();
		this.$ionicPopup.alert({ title: "刷新成功" });
	};

	async GetInCars() {
		try {
			if (this.$rootScope.isLogin) {
				this.showLoading();
				var plates:GetCarsParam[]=[];
				for (let v of this.$rootScope.currentUser.vehicles){
					var p=new GetCarsParam();
					p.aPlateNo=v.plate;
                    plates.push(p);
				};
				var cs = await this.ParkingService.GetInCars(plates);
			    this.cars=cs.filter((c)=>{return (c.oKFlag != CarFlag.success)});
				//this.$rootScope.$apply();
				this.hideLoading();
			} else {
				this.$ionicPopup.alert({
					title: "停车前请先登录或者注册"
				});
				this.$state.go("tab.account");
				//$ionicPopup.alert({title:"ok"});
			}
		} catch (err) {
			this.$ionicPopup.alert({
				title: err
			});
		};
	};
}

angular.module('starter.controllers')
	.controller('ParkingCtrl', ParkingController);

