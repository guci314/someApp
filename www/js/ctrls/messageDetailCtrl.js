angular.module('starter.controllers')
	.controller('MessageDetailCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPopup) {
		var messageId = $stateParams.messageId;
		　　　　　　　　
		for (var m in $rootScope.messages) {　　　　　　　　
			if (messageId == $rootScope.messages[m].id) {　　　　　　　　
				$scope.message = $rootScope.messages[m];　　　　　　　　
				break;　　　　　　　　
			};　　　　　　　　
		};

	});