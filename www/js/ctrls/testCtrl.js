angular.module('starter.controllers')
    .controller('TestCtrl', function($scope, $rootScope, $ionicPopup, RegisterService, VehicleService) {

        $scope.addTestAccount = function() {
            handleResponse = function(data) {
                var alertPopup = $ionicPopup.alert({
                    title: '完成'
                });
            };


            var phoneNumber = '18674048896';
            var validCode = '111';
            var password = '11111';


            var p = RegisterService.register(phoneNumber, validCode, password);
            p.then(function(res) {
                var p1 = RegisterService.changeUserName(phoneNumber, 'testUser');
                p1.then(function(res1) {
                    // VehicleService.bindPlate('18674048896', 'aaa', true).then(function(res) {
                    //     VehicleService.bindPlate('18674048896', 'bbb', true).then(function(res) {
                    //         VehicleService.bindPlate('18674048896', 'c', false).then(function(res) {
                    //             $ionicPopup.alert({title:"ok"});

                    //         });
                    //     });
                    // });
                    VehicleService.bindPlate('18674048896', 'aaa', true);
                    VehicleService.bindPlate('18674048896', 'bbb', true);
                    VehicleService.bindPlate('18674048896', 'c', false);
                });
            });
        };

        $scope.test = function() {
            RegisterService.getUserByPhoneNumber('18674048896').then(function(res) {
                $ionicPopup.alert({ title: JSON.stringify(res) });
            });
            //$ionicPopup.alert({ title: JSON.stringify($rootScope.currentUser) });
        };

        $scope.addVehicle = function() {


        };
    })
