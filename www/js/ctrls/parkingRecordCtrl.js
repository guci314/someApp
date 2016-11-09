angular.module('starter.controllers')
	.controller('ParkingRecordCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicModal, localStorageService, ParkingService) {

		$scope.sync = function() {
			ParkingService.getParkingRecords($rootScope.currentUser.phoneNumber).then(function(res) {
				$scope.records = res;
			});
		};
		$scope.sync();
	});