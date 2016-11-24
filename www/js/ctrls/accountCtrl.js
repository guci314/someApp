///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../services/updateService.ts"/>

angular.module('starter.controllers')
    .controller('AccountCtrl',
    /**
     * @param {angular.IHttpService} $http
     * @param {angular.IScope} $scope
     * @param {angular.IRootScopeService} $rootScope
     * @param {angular.IQService} $q
     * @param {ionic.popup.IonicPopupService} $ionicPopup
     * @param {UpdateService} updateService
     */
    function ($scope,$ionicPopup,UpdateService) {

        //$scope.currentPlatform = ionic.Platform.platform();
        
        $scope.update=()=>{
            UpdateService.update();
        };

        $scope.exit = function () {
            var confirm = $ionicPopup.confirm({
                title: "确认",
                template: "退出程序吗?",
                okText: "确定",
                cancelText: "取消"
            }).then(function(res){
                if (res) ionic.Platform.exitApp();
            });
        };

    });