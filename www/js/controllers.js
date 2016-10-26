angular.module('starter.controllers', [])

        .controller('DashCtrl', function ($scope) {})

        .controller('FeeCtrl', function ($scope, Chats) {
            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            $scope.chats = Chats.all();
            $scope.remove = function (chat) {
                Chats.remove(chat);
            };
        })

        .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
        })

        .controller('AccountCtrl', function ($scope,$rootScope,$ionicPopup) {
            $scope.settings = {
                enableFriends: true
            };
        })

        .controller('TestCtrl', function ($scope, $ionicPopup) {
            $scope.settings = {
                enableFriends: true
            };
            $scope.test = function () {
                handleSuccess = function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: data.name
                    });
                }

                handleError = function (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: error.message
                    });
                }

                //UserService.GetById(30).then(handleSuccess, handleError);
            }
        })

        .controller('RegisterCtrl', function ($scope, $ionicPopup, RegisterService) {
            $scope.getAuthcode = function () {
                console.log('getAuthcode');
            };
            $scope.sendData = {
                phoneNumber: '',
                valideCode: '',
                password: ''
            };
            $scope.register = function () {
                handleResponse = function (data) {
                    if (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: '注册成功'
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '注册失败'
                        });
                    }
                };
                console.log($scope.sendData.phoneNumber);
                RegisterService.register($scope.sendData.phoneNumber, $scope.sendData.validCode, $scope.sendData.password).then(handleResponse);
            };

        });

        
