angular.module('starter.controllers')
	.controller('ParkingCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicModal, localStorageService, ParkingService) {
		$scope.entity = {
			phoneNumber: '',
			password: ''
		};

		$ionicModal.fromTemplateUrl('templates/parkingModal.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.parkingModal = modal;
		});

		$ionicModal.fromTemplateUrl('templates/pickupModal.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.pickupModal = modal;
		});

		$scope.requestParking = function() {
			if ($rootScope.isLogin) {
				ParkingService.requestParking($rootScope.currentUser.phoneNumber).then(function(res) {
					$scope.parkingMsg = res;
					$scope.parkingModal.show();
				});
			} else {
				$ionicPopup.alert({
					title: "停车前请先登录或者注册"
				});
				
				$state.go("tab.account");
				//$ionicPopup.alert({title:"ok"});
			}


		};

		$scope.requestPickup = function() {
			if ($rootScope.isLogin) {
				ParkingService.requestPickup($rootScope.currentUser.phoneNumber).then(function(res) {
					$scope.pickupMsg = res;
					$scope.pickupModal.show();
				});
			} else {
				$ionicPopup.alert({
					title: "取车前请先登录或者注册"
				});
				
				$state.go("tab.account");
				//$ionicPopup.alert({title:"ok"});
			}

		};
	});