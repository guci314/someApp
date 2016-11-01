angular.module('starter.controllers')
        .controller('LoginCtrl', function ($scope,$rootScope,$state, $ionicPopup,localStorageService, RegisterService) {
            $scope.entity = {
                phoneNumber: '',
                password: ''
            };
            $scope.login = function () {
                console.log('login');
                RegisterService.login($scope.entity.phoneNumber, $scope.entity.password).then(handleResponse);
                function handleResponse(res) {
                    if (res) {
                        var alertPopup = $ionicPopup.alert({
                            title: '登录成功'
                        });
                        saveUser=function(user){
                            $rootScope.currentUser=user;
                            //console.log(user.phoneNumber);
                        };
                        RegisterService.getUserByPhoneNumber($scope.entity.phoneNumber).then(saveUser);
                        //$rootScope.currentUser.phoneNumber=$scope.entity.phoneNumber;
                        $rootScope.isLogin=true;
                        $state.go('tab.account');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '登录失败'
                        });
                    }
                };
            };
            
        });

