angular.module('starter.controllers')
        .controller('ChangePasswordCtrl', function ($scope, $rootScope, $state, $ionicPopup, RegisterService) {
            $scope.entity = {
                oldPassword: '',
                newPassword: '',
                comfirmPassword: ''
            };

            $scope.changePassword = function () {
                if ($scope.entity.oldPassword != $rootScope.currentUser.password) {
                    alertPopup = $ionicPopup.alert({
                        title: '原密码不正确'
                    });
                    return false;
                }

                if ($scope.entity.newPassword != $scope.entity.confirmPassword) {
                    alertPopup = $ionicPopup.alert({
                        title: '新密码和确认密码不一直'
                    });
                    return false;
                }

                RegisterService.changePassword($rootScope.currentUser.phoneNumber, $scope.entity.oldPassword, $scope.entity.newPassword).then(handleResponse);
                function handleResponse(res) {
                    if (res) {
                        $ionicPopup.alert({
                            title: '修改密码成功'
                        });
                        saveUser = function (user) {
                            $rootScope.currentUser = user;
                            $scope.$apply();
                            $state.go('tab.account-detail');
                        };
                        $rootScope.currentUser.password=$scope.entity.newPassword;
                        RegisterService.getUserByPhoneNumber($rootScope.currentUser.phoneNumber).then(saveUser);
                        //$rootScope.currentUser.phoneNumber=$scope.entity.phoneNumber;
                        //$rootScope.isLogin = true;
                        
                    } else {
                        // $ionicPopup.alert({
                        //     title: '修改密码失败'
                        // });
                    }
                }

            }
        })
