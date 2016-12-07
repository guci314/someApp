angular.module('starter.controllers').controller('ParkingRecordCtrl1', function ($scope, $rootScope, $timeout, $ionicPopup, $ionicLoading, ParkingService) {
    var plates = [];
    for (let v of $rootScope.currentUser.vehicles) {
        var p = new GetCarsParam();
        p.aPlateNo = v.plate;
        plates.push(p);
    }
    ;
    $scope.pageNumber = 0;
    $scope.more = true;
    $scope.hasMoreData = true;
    $scope.records = [];
    if ($rootScope.isLogin) {
        $ionicLoading.show({
            template: '<p>请稍候...</p><ion-spinner></ion-spinner>',
            duration: 20000
        });
        ParkingService.getRecordsByPageNo($scope.pageNumber, 10, plates).then(v => {
            $scope.records = $scope.records.concat(v);
            $ionicLoading.hide();
        });
    }
    ;
    $scope.loadMore = function () {
        if ($scope.hasMoreData === false) {
            $scope.more = false;
            return;
        }
        ;
        $scope.more = false;
        $scope.pageNumber = $scope.pageNumber + 1;
        console.log("loadMore,page number:" + $scope.pageNumber);
        ParkingService.getRecordsByPageNo($scope.pageNumber, 10, plates)
            .then(recs => {
            recs.forEach(element => {
                $scope.records.push(element);
                //$scope.$applyAsync();    
            });
            //$scope.records = $scope.records.concat(recs);
            console.log("recorder size:" + $scope.records.length.toString());
            //$timeout(function () { $scope.$broadcast('scroll.infiniteScrollComplete') }, 1000);
            $timeout(function () {
                $scope.more = true;
            }, 500);
            //$scope.more = true;
            if (recs.length < 10)
                $scope.hasMoreData = false;
        });
    };
});
//# sourceMappingURL=parkingRecordCtrl1.js.map