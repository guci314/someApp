///<reference path="../../../typings/tsd.d.ts" />



interface IFeeScope extends ng.IScope {
	cars: any;
	CommitOutCar: any;
	test: any;
	getOutCars:any;
};


function hello(){
	console.log("hello world");
}

angular.module('starter.controllers')
	.controller('FeeCtrl',
	function ($scope: IFeeScope, $q: ng.IQService, $timeout: ng.ITimeoutService, $ionicLoading: ionic.loading.IonicLoadingService, $rootScope:any, $state: ng.ui.IStateService, $ionicPopup: ionic.popup.IonicPopupService, ParkingService:any) {

		var showLoading = function () {
			$ionicLoading.show({
				template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
		};
		var hideLoading = function () {
			$ionicLoading.hide();
		};

		var checkCarStatus = async (phone:string, plateNo:string):Promise<number> => {
			var stopQuery = false;
			var queryResult:any
			$timeout(() => { stopQuery = true; }, 20000);
			while (!stopQuery) {
				queryResult = await ParkingService.GetOutCar(phone, plateNo);
				console.log(queryResult);
				if ((queryResult.oKFlag === 2) || (queryResult.oKFlag === 9)) {
					break;
				} else {
					await delay(1000);
				};
			};
			return queryResult.oKFlag;
		};

		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		$scope.CommitOutCar = async (aPlateNo:any) => {
			showLoading();
			let res = await ParkingService.CommitOutCar($rootScope.currentUser.phoneNumber, aPlateNo);
			console.log(res);
			let code=await checkCarStatus(res.phone,res.plateNo);
			hideLoading();
			if (code === 9) {
				$ionicPopup.alert({ title: "取车成功" });
			} else {
				$ionicPopup.alert({ title: "取车失败" });
			};
		};

		$scope.getOutCars = async function () {

			try {
				if ($rootScope.isLogin) {
					showLoading();
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
			}finally{
                hideLoading();
			};

		};

		$scope.getOutCars();

	});