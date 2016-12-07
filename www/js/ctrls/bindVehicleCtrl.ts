class BindVehicleController {
    private $rootScope: IParkingRootScope;
    private $ionicPopup: ionic.popup.IonicPopupService;
    private $state: ng.ui.IStateService;
    private $ionicPopover: ionic.popover.IonicPopoverService;
    private VehicleService: VehicleService;
    private $scope: ng.IScope;

    constructor($scope: any, $rootScope: any, $ionicPopup: any, $state: any, $ionicPopover: any, VehicleService: any) {
        //console.log("ResetPasswordController constructor is called");
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.$ionicPopover = $ionicPopover;
        this.VehicleService = VehicleService;

        //$scope.animation = 'slide-in-up';
        this.$ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: this.$scope
        }).then((popover: any) => {
            this.popover = popover;
        });
    }

    popover: ionic.popover.IonicPopoverController;
    plate: string;
    autoCharge: boolean = false;

    keypress($event: KeyboardEvent) {
        if ($event.key === '-' || $event.key === '_') {
            $event.preventDefault();
        }
    }

    async delete(id: number, index: number) {
        let res = await this.$ionicPopup.confirm({
            title: "确认删除",
            template: "你确实要删除这个车辆吗?",
            okText: "确定",
            cancelText: "取消"
        });
        if (res) {
            let x = await this.VehicleService.deleteVehicle(id);
            if (x) {
                this.$rootScope.currentUser.vehicles.splice(index, 1);
                this.$scope.$apply();
            }
        }
    };

    async bindPlate() {
        this.plate = this.plate.toUpperCase();

        if (this.$rootScope.currentUser.vehicles.length >= 3) {
            this.$ionicPopup.alert({
                title: '一个电话号码最多绑定三辆车',
                okText: "确定"
            });
            return;
        };
        //let b= await this
        for (var v in this.$rootScope.currentUser.vehicles) {
            if (this.$rootScope.currentUser.vehicles[v].plate == this.plate) {
                this.$ionicPopup.alert({
                    title: "不能重复绑定车牌号",
                    okText: "确定"
                });
                return;
            }
        };

        let b = await this.VehicleService.checkBindStatus(this.plate);
        if (!b) {
            this.$ionicPopup.alert({
                title: '此车辆已绑定到另一个手机号码',
                okText: "确定"
            });
            return;
        }

        //$timeout(()=>{VehicleService.bindPlate($rootScope.currentUser.phoneNumber, $scope.entity.vehicleNumber, $scope.entity.autoCharge).then(handleResponse, handleError);});
        let res = await this.VehicleService.bindPlate(this.$rootScope.currentUser.phoneNumber, this.plate, this.autoCharge);
        if (res) {
            this.$ionicPopup.alert({
                title: "绑定成功",
                okText: "确定"
            });
            this.$rootScope.currentUser.vehicles.push(res);
            //$rootScope.$apply();
        }
    }
}

angular.module('starter.controllers')
    .controller('BindVehicleCtrl', BindVehicleController);