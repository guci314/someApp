angular.module('starter.controllers')
        .controller('ParkingCtrl', function ($scope,$rootScope,$state, $ionicPopup,localStorageService, RegisterService) {
            $scope.entity = {
                phoneNumber: '',
                password: ''
            };
        });

