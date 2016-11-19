angular.module('starter.controllers', ['ngCordova.plugins.appVersion'])

.controller('DashCtrl', function($scope) {})

.controller('FeeCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('RegisterCtrl', function($scope, $rootScope, $ionicPopup, $state, RegisterService) {
    $scope.getAuthcode = function() {
        $ionicPopup.alert({
            title: '验证码已发送'
        });
    };
    $scope.sendData = {
        phoneNumber: '',
        valideCode: '',
        password: ''
    };

    $scope.openEye = true;
    var passwordField = angular.element(document.querySelector('#password'));

    $scope.showPassword = function() {
        if ($scope.openEye) {
            $scope.openEye = false;
            passwordField.attr('type', 'text');
        } else {
            $scope.openEye = true;
            passwordField.attr('type', 'password');
        }
    };

    $scope.register = function() {
        handleResponse = function(data) {
            if (data) {
                var alertPopup = $ionicPopup.alert({
                    title: '注册成功'
                });
                saveUser = function(user) {
                    $rootScope.currentUser = user;
                    $rootScope.isLogin = true;
                    //console.log(user.phoneNumber);
                };
                $rootScope.currentUser = {
                    'phoneNumber': $scope.sendData.phoneNumber,
                    'password': $scope.sendData.password
                }
                RegisterService.getUserByPhoneNumber($scope.sendData.phoneNumber)
                    .then(saveUser)
                    .then(function() {
                        $state.go('tab.account');
                        //$ionicHistory.clearHistory();
                    });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '电话号码已存在'
                });
            }
        };
        handleError = (err) => {
            $ionicPopup.alert({
                title: '注册发生错误'
            });
            console.log(JSON.stringify(err));
        };

        RegisterService.register($scope.sendData.phoneNumber, $scope.sendData.validCode, $scope.sendData.password)
            .then(handleResponse)
            .catch(handleError);

    };

});