///<reference path="../../../typings/tsd.d.ts" />

angular.module('starter.controllers')
	.controller('ParkingCtrl',
	/**
     * @param {angular.IHttpService} $http
     * @param {angular.IScope} $scope
     * @param {angular.IRootScopeService} $rootScope
     * @param {angular.IQService} $q
     * @param {ionic.popup.IonicPopupService} $ionicPopup
	 * @param {ionic.modal.IonicModalService} $ionicModal
	 * @param {ng.ui.IStateService} $state
	 * @param {ng.ITimeoutService} $timeout 
	 * @param {angular.local.storage.ILocalStorageServiceProvider} localStorageService
     */
	function ($scope, $rootScope, $timeout, $q, $state, $ionicLoading, $ionicPopup, $ionicModal, localStorageService, ParkingService) {

		$scope.showLoading = function () {
			$ionicLoading.show({
				template: '<p>正在停车,请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
		};
		$scope.hideLoading = function () {
			$ionicLoading.hide();
		};

		function InCarState() {
			this.binCode = "";
			this.binKeyCode = "";
			this.id = 1;
			this.inOutStation = "";
			this.inTime = "";
			this.oKFlag = 0;
			this.phone = "";
			this.plateNo = "";
			this.stockCode = "";
			this.stockName = "";
			this.version = 1;
			this.commitFlag = false;
		}

		$scope.stopQuery = false;
		$scope.queryResult = new InCarState();
		$scope.phone = "";
		$scope.plateNo = "";
		$scope.defer = null;
		function queryLoop() {
			if ($scope.stopQuery) {
				$scope.defer.resolve($scope.queryResult);
			} else {
				ParkingService.GetInCar($scope.phone, $scope.plateNo)
					.then(function (res1) {
						angular.extend($scope.queryResult, res1);
						//console.log("plateNo=" + $scope.queryResult.plateNo);
						//console.log("oKFlag=" + $scope.queryResult.oKFlag);
						if (($scope.queryResult.oKFlag === 2) || ($scope.queryResult.oKFlag === 9)) {
							$scope.defer.resolve($scope.queryResult);
						} else {
							$timeout(queryLoop, 1000);
						};
					});
			};
		}

		function query(phone, plateNo) {
			$scope.phone = phone;
			$scope.plateNo = plateNo;
			$scope.stopQuery = false;
			$timeout(function () { $scope.stopQuery = true; }, 20000);
			$scope.defer = $q.defer();
			queryLoop();
			return $scope.defer.promise;
		}

		$scope.CommitInCar = function (aPlateNo) {
			ParkingService.CommitInCar($rootScope.currentUser.phoneNumber, aPlateNo)
				.then(function (res) {
					$scope.showLoading();
					query(res.phone, res.plateNo).then(function (res) {
						$scope.hideLoading();
						//console.log(res);
						if (res.oKFlag === 9) {
							$ionicPopup.alert({ title: "停车成功" });
						} else {
							$ionicPopup.alert({ title: "停车失败" });
						};
					});
				});
		};

		$scope.queryStatus = function (phone, plateNo) {
			ParkingService.GetInCar(phone, plateNo)
				.then(function (res1) {
					var status = new InCarState();
					angular.extend(status, res1);
					switch (status.oKFlag) {
						case 0:
							if (status.commitFlag) {
								$ionicPopup.alert({ title: "已提交" });
							} else {
								$ionicPopup.alert({ title: "初始态" });
							};
							break;
						case 1:
							$ionicPopup.alert({ title: "执行中" });
							break;
						case 2:
							$ionicPopup.alert({ title: "已失败" });
							break;
						case 9:
							$ionicPopup.alert({ title: "已成功" });
							break;
					}
				});
		};

		$scope.refresh = function () {
			$scope.GetInCars();
			$ionicPopup.alert({ title: "刷新成功" });
		};

		$scope.GetInCars = function () {
			try {
				if ($rootScope.isLogin) {
					ParkingService.GetInCars($rootScope.currentUser.phoneNumber)
						.then(function (res) {
							$scope.cars = res;
							//parkingModal.show();
						});
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

		// $scope.entity = {
		// 	phoneNumber: '',
		// 	password: ''
		// };
		/** @type {ionic.modal.IonicModalController} */
		//var parkingModal;
		/** @type {ionic.modal.IonicModalController} */
		//var pickupModal;

		// $ionicModal.fromTemplateUrl('templates/parkingModal.html', {
		// 	scope: $scope
		// }).then(function (modal) {
		// 	parkingModal = modal;
		// 	$scope.parkingModal=modal;
		// });

		// $ionicModal.fromTemplateUrl('templates/pickupModal.html', {
		// 	scope: $scope
		// }).then(function (modal) {
		// 	pickupModal = modal;
		// 	$scope.pickupModal=modal;
		// });



		// $scope.requestPickup = function () {
		// 	if ($rootScope.isLogin) {
		// 		ParkingService.requestPickup($rootScope.currentUser.phoneNumber).then(function (res) {
		// 			$scope.pickupMsg = res;
		// 			$scope.pickupModal.show();
		// 		});
		// 	} else {
		// 		$ionicPopup.alert({
		// 			title: "取车前请先登录或者注册"
		// 		});

		// 		$state.go("tab.account");
		// 		//$ionicPopup.alert({title:"ok"});
		// 	}

		// };
	});