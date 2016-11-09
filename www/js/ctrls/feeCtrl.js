angular.module('starter.controllers')
	.controller('FeeCtrl', function($scope, $rootScope, $state, $ionicPopup, QueryFeeService) {
		$scope.entity = {};

		$scope.queryFee = function() {

			try {
				if ($rootScope.isLogin) {
					QueryFeeService.queryFee($rootScope.currentUser.phoneNumber).then(function(res) {
						$scope.entity = res;
					});
				} else {
					$ionicPopup.alert({
						title: "查询费用前请先登录或者注册"
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