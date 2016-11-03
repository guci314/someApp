angular.module('starter.controllers')
	.controller('ParkingCtrl', function($scope, $rootScope, $state, $ionicPopup,$ionicModal, localStorageService, ParkingService) {
		$scope.entity = {
			phoneNumber: '',
			password: ''
		};

		$scope.requestParking = function() {
			ParkingService.requestParking($rootScope.currentUser.phoneNumber).then(function(res) {
				$scope.parkingMsg = res;
				$scope.modal.show();
			});
		};

		$ionicModal.fromTemplateUrl('templates/modal.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});
	});