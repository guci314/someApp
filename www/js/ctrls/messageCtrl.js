angular.module('starter.controllers')
	.controller('MessageCtrl', function($scope, $rootScope, $state, $ionicPopup, $resource, appConfig, MessageService) {
		$rootScope.messages = [];

		function loadMessages() {
			MessageService.findMessageByPhoneNumber($rootScope.currentUser.phoneNumber)
				.then(function(res) {
					$rootScope.messages = res;
				});
		};
		loadMessages();
		$scope.remove = function(message) {

			MessageService.delete(message.id)
				.then(function() {
					var index = $rootScope.messages.indexOf(message);
					$rootScope.messages.splice(index, 1);
				});
		};

	});