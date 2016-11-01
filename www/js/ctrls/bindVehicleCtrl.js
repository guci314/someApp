angular.module('starter.controllers')
    .controller('BindVehicleCtrl', function($scope, $rootScope, $state, $ionicPopup, VehicleService) {

        $scope.entity = {
            vehicleNumber: '',
            autoCharge: true
        };

        // VehicleService.findVehiclesByPhoneNumber($rootScope.currentUser.phoneNumber).then(handleResponse);

        // function handleResponse(res) {
        //     $scope.vehicles = res;
        // };

        $scope.delete = function(id, index) {
            var confirm = $ionicPopup.confirm({
                title: "确认删除",
                template: "你确实要删除这个车辆吗?",
                okText: "确定",
                cancelText: "取消"
            });
            confirm.then(function(res) {
                if (res) {
                    VehicleService.deleteVehicle(id).then(function(res) {
                        if (res) {
                            $rootScope.currentUser.vehicles.splice(index, 1);
                        }

                    });
                }
            });

        };

        $scope.bindPlate = function() {
            for (var v in $rootScope.currentUser.vehicles) {
                if ($rootScope.currentUser.vehicles[v].plate == $scope.entity.vehicleNumber) {
                    $ionicPopup.alert({ title: "不能重复绑定" });
                    return;
                }
            };
            VehicleService.bindPlate($rootScope.currentUser.phoneNumber, $scope.entity.vehicleNumber, $scope.entity.autoCharge).then(handleResponse, handleError);

            function handleResponse(res) {
                if (res) {
                    $rootScope.currentUser.vehicles.push(res);
                }
            };　　　　　　　 //粤B9F09C
            function handleError(err) {
                console.log(err);
            };
        }
    });
