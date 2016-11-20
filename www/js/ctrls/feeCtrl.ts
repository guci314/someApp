///<reference path="../../../typings/tsd.d.ts" />



interface IFeeScope extends ng.IScope {
	cars: any;
	CommitOutCar: any;
	test: any;
};


function hello(){
	console.log("hello world");
}

angular.module('starter.controllers')
	.controller('FeeCtrl',
	function ($scope: IFeeScope, $q: ng.IQService, $timeout: ng.ITimeoutService, $ionicLoading: ionic.loading.IonicLoadingService, $rootScope:any, $state: ng.ui.IStateService, $ionicPopup: ionic.popup.IonicPopupService, ParkingService:any) {

		var showLoading = function () {
			$ionicLoading.show({
				template: '<p>正在取车,请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
		};
		var hideLoading = function () {
			$ionicLoading.hide();
		};

		var checkCarStatus = async () => {
			this.stopQuery = false;
			$timeout(() => { this.stopQuery = true; }, 3000);
			while (!this.stopQuery) {
				this.queryResult = await ParkingService.GetOutCar(this.phone, this.plateNo);
				console.log(this.queryResult);
				if ((this.queryResult.oKFlag === 2) || (this.queryResult.oKFlag === 9)) {
					break;
				} else {
					await delay(1000);
				};
			};
		};

		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		this.stopQuery = false;
		this.queryResult = null;
		this.phone = "";
		this.plateNo = "";
		
		$scope.CommitOutCar = async (aPlateNo:any) => {
			showLoading();
			let res = await ParkingService.CommitOutCar($rootScope.currentUser.phoneNumber, aPlateNo);
			console.log(res);
			this.phone=res.phone;
			this.plateNo=res.plateNo;
			await checkCarStatus();
			hideLoading();
			if (this.queryResult.oKFlag === 9) {
				$ionicPopup.alert({ title: "取车成功" });
			} else {
				$ionicPopup.alert({ title: "取车失败" });
			};
		};

		this.queryFee = async function () {

			try {
				if ($rootScope.isLogin) {
					$scope.cars = await ParkingService.GetOutCars($rootScope.currentUser.phoneNumber);
					$scope.$apply();
				} else {
					$ionicPopup.alert({
						title: "取车前请先登录或者注册"
					});

					$state.go("tab.account");
					//$ionicPopup.alert({title:"ok"});
				}
			} catch (err) {
				$ionicPopup.alert({
					title: err
				});
			};

		};

		this.queryFee();

	});