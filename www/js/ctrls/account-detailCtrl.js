angular.module('starter.controllers')
        .controller('Account-detailCtrl',
                function ($scope, $rootScope, $state, $ionicPopup, RegisterService) {

//        RegisterService.getUserByPhoneNumber($rootScope.phoneNumber)
//                .then(function(res){
//                $scope.entity = res;
//                });
//                console.log($scope.entity);
                    $scope.changeName = function () {

                        function handleResponse(res1) {
                            if(res1){
                              saveUser=function(user){
                                $rootScope.currentUser=user;
                              };
                              RegisterService.getUserByPhoneNumber($rootScope.currentUser.phoneNumber).then(saveUser);      
                            }else{
                                alertPopup = $ionicPopup.alert({
                                  title: '修改用户名失败，请检查网络连接'
                                });
                            };
                        }

                        $ionicPopup.prompt({
                            title: '更改真实姓名',
                            template: '请输入你的真实姓名,以便厂家能更好的服务您！',
                            inputPlaceholder: '',
                            okText: '确定',
                            cancelText: '取消'
                        }).then(function (res) {
                            if (res && res !== '') {
                                RegisterService.changeUserName($rootScope.currentUser.phoneNumber, res).then(handleResponse);
                                //UserService.Update({id: $scope.entity.id}, {name: res})
                            }
                        })
                    };
                    $scope.logout = function () {
                        $ionicPopup.alert({
                            title: '你已登出'
                        });
                        $rootScope.currentUser = null;
                        $rootScope.isLogin = false;
                        $state.go('tab.account');
                    };
                }
        );

