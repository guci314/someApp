///<reference path="../../../typings/tsd.d.ts" />

class InCarState {
	binCode: string;
	binKeyCode: string;
	id: number;
	inOutStation: string;
	inTime: string;
	oKFlag: number;
	phone: string;
	plateNo: string;
	stockCode: string;
	stockName: string;
	version: number;
	commitFlag: boolean;
}

interface IParkingScope extends ng.IScope {
	CommitInCar: any;
	refresh: any;
	GetInCars: any;
	cars: InCarState[];
};

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

angular.module('starter.controllers')
	.controller('ParkingCtrl',
	function ($scope: IParkingScope, $rootScope: any, $timeout: ng.ITimeoutService, $q: ng.IQService, $state: ng.ui.IStateService, $ionicLoading: ionic.loading.IonicLoadingService, $ionicPopup: ionic.popup.IonicPopupService, $ionicModal: ionic.modal.IonicModalService, localStorageService: ng.local.storage.ILocalStorageService, ParkingService: any) {

		var showLoading = function () {
			$ionicLoading.show({
				template: '<p>正在停车,请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
		};
		var hideLoading = function () {
			$ionicLoading.hide();
		};
        
		async function checkCarStatus(phone:string,plateNo:string):Promise<number>{
			var stopQuery = false;
			var queryResult:InCarState;
			$timeout(() => { stopQuery = true; }, 3000);
			while (!stopQuery) {
				queryResult = await ParkingService.GetInCar(phone, plateNo);
				console.log(queryResult);
				if ((queryResult.oKFlag === 2) || (queryResult.oKFlag === 9)) {
					break;
				} else {
					await delay(1000);
				};
			};
			return queryResult.oKFlag;
		};


		$scope.CommitInCar = async (aPlateNo: string) =>{
			showLoading();
			let res:InCarState =await ParkingService.CommitInCar($rootScope.currentUser.phoneNumber, aPlateNo);
			console.log(res);
			let code=await checkCarStatus(res.phone,res.plateNo);
			console.log("get rerult");
			console.log(code);
			hideLoading();
			if (code === 9) {
				$ionicPopup.alert({ title: "停车成功" });
			} else {
				$ionicPopup.alert({ title: "停车失败" });
			};
		};



		$scope.refresh = function () {
			$scope.GetInCars();
			$ionicPopup.alert({ title: "刷新成功" });
		};

		$scope.GetInCars = async function () {
			try {
				if ($rootScope.isLogin) {
					$scope.cars = await ParkingService.GetInCars($rootScope.currentUser.phoneNumber);
					$scope.$apply();
				} else {
					$ionicPopup.alert({
						title: "停车前请先登录或者注册"
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


		$scope.GetInCars();


	});