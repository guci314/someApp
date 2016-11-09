angular.module('starter.controllers')
    .controller('LoginCtrl', function($scope, $rootScope,$ionicHistory, $state, $ionicPopup, localStorageService, RegisterService) {
        $scope.entity = {
            phoneNumber: '',
            password: ''
        };
        $scope.login = function() {
            console.log('login');
            RegisterService.login($scope.entity.phoneNumber, $scope.entity.password).then(handleResponse, handleError);

            function handleResponse(res) {
                if (res) {
                    var alertPopup = $ionicPopup.alert({
                        title: '登录成功'
                    });
                    saveUser = function(user) {
                        $rootScope.currentUser = user;
                        $rootScope.isLogin = true;
                        //console.log(user.phoneNumber);
                    };
                    $rootScope.currentUser = {
                        'phoneNumber': $scope.entity.phoneNumber,
                        'password': $scope.entity.password
                    }
                    RegisterService.getUserByPhoneNumber($scope.entity.phoneNumber)
                        .then(saveUser)
                        .then(function() {
                            $state.go('tab.account');
                            //$ionicHistory.clearHistory();
                        });
                    //$rootScope.currentUser.phoneNumber=$scope.entity.phoneNumber;
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '登录失败'
                    });
                }
            };

            function handleError(err) {
                console.log(err);
            };
        };

    });