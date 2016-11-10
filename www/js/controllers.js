angular.module('starter.controllers', [])

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

.controller('AccountCtrl', function($scope, $rootScope, $ionicPopup) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('RegisterCtrl', function($scope, $ionicPopup, $state, RegisterService) {
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
    $scope.register = function() {
        handleResponse = function(data) {
            if (data) {
                var alertPopup = $ionicPopup.alert({
                    title: '注册成功'
                });
                $state.go('tab.account');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '注册失败'
                });
            }
        };
        handleError = (err) => {
            $ionicPopup.alert({
                title: '注册发生错误:' + err
            });
        };
        try {
            RegisterService.register($scope.sendData.phoneNumber, $scope.sendData.validCode, $scope.sendData.password)
                .then(handleResponse)
                .catch(handleError);
        } catch (err) {
            $ionicPopup.alert({
                title: 'shit'
            });
        }
    };

});