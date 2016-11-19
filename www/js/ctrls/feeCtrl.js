angular.module('starter.controllers')
	.controller('FeeCtrl', function ($scope, $q, $timeout, $ionicLoading, $rootScope, $state, $ionicPopup, ParkingService) {
		$scope.cars = {};

		$scope.showLoading = function () {
			$ionicLoading.show({
				template: '<p>正在取车,请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
		};
		$scope.hideLoading = function () {
			$ionicLoading.hide();
		};

		$scope.stopQuery = false;
		$scope.queryResult = null;
		$scope.phone = "";
		$scope.plateNo = "";
		$scope.defer = null;
		function queryLoop() {
			if ($scope.stopQuery) {
				$scope.defer.resolve($scope.queryResult);
			} else {
				ParkingService.GetOutCar($scope.phone, $scope.plateNo)
					.then(function (res1) {
						$scope.queryResult = res1;
						console.log("plateNo=" + $scope.queryResult.plateNo);
						console.log("oKFlag=" + $scope.queryResult.oKFlag);
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

		$scope.CommitOutCar = function (aPlateNo) {
			ParkingService.CommitOutCar($rootScope.currentUser.phoneNumber, aPlateNo)
				.then(function (res) {
					console.log(res);
					$scope.showLoading();
					query(res.phone, res.plateNo).then(function (res) {
						$scope.hideLoading();
						console.log(res);
						if (res.oKFlag === 9) {
							$ionicPopup.alert({ title: "取车成功" });
						} else {
							$ionicPopup.alert({ title: "取车失败" });
						};
					});
				});
		};

		$scope.queryFee = function () {

			try {
				if ($rootScope.isLogin) {
					ParkingService.GetOutCars($rootScope.currentUser.phoneNumber)
						.then(function (res) {
							$scope.cars = res;
						});
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

		$scope.queryFee();


	});