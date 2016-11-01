angular.module('starter.controllers')
    .controller('WalletCtrl', function($scope, $rootScope, $state, $ionicPopup, localStorageService, WalletService) {

        $scope.entity = {
            balance: 0
        };

        WalletService.getBalance($rootScope.currentUser.phoneNumber).then(function(res) {
            $scope.entity.balance = res;
        });

        $scope.deposit = function() {
            var v = $('#amount option:selected').val();

            WalletService.deposit($rootScope.currentUser.phoneNumber, parseFloat(v)).then(function(res) {
                if (res) {
                    WalletService.getBalance($rootScope.currentUser.phoneNumber).then(function(res) {
                        $scope.entity.balance = res;
                    });
                }
            });
        };
    });