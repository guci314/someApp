angular.module('starter.controllers')
	.controller('ParkingRecordCtrl', function ($scope, $rootScope,$ionicLoading, $state, $ionicPopup, $ionicModal, localStorageService, ParkingService) {

		$scope.sync = function () {
			$ionicLoading.show({
				template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
				duration: 100000
			});
			ParkingService.getParkingRecords($rootScope.currentUser.phoneNumber)
				.then(function (res) {
					$scope.records = res;
					$ionicLoading.hide();
				});
		};
		$scope.sync();
	});