class User{
    id?:number;
    name?:string;
    password:string;
    phoneNumber:string;
    vehicles?:Vehicle[];
}

class Vehicle{
    id:number;
    plate:string;
    autoCharge:boolean;
}

/**
 * 伟创停车rootScope
 */
interface IParkingRootScope extends ng.IRootScopeService{
    currentUser:User;
    isLogin:boolean;
}

class ResetPasswordController {
    private $rootScope: IParkingRootScope; 
    private $ionicPopup: ionic.popup.IonicPopupService; 
    private $state: ng.ui.IStateService; 
    private RegisterService: any;

    //static $inject = ["$rootScope","$ionicPopup","$state","RegisterService"];

    constructor($rootScope:any,$ionicPopup:any,$state:any,RegisterService:any) {
        //console.log("ResetPasswordController constructor is called");
        this.$rootScope=$rootScope;
        this.$ionicPopup=$ionicPopup;
        this.$state=$state;
        this.RegisterService=RegisterService;
    }

    phoneNumber: string;
    valideCode: string;
    password: string;
    openEye: boolean = true;

    showPassword() {
        let passwordField = angular.element(document.querySelector('#password'));
        if (this.openEye) {
            this.openEye = false;
            passwordField.attr('type', 'text');
        } else {
            this.openEye = true;
            passwordField.attr('type', 'password');
        }
    }

    getAuthcode() {
        this.$ionicPopup.alert({
            title: '验证码已发送,十分钟后失效'
        });
    }

    async resetPassword() {
        let code = await this.RegisterService.resetPassword(this.phoneNumber, this.valideCode, this.password);
        switch (code) {
            case 1:
                {
                    this.$ionicPopup.alert({
                        title: '重置密码成功'
                    });
                    
                    this.$rootScope.currentUser = {
                        'phoneNumber': this.phoneNumber,
                        'password': this.password
                    }
                    let user=await this.RegisterService.getUserByPhoneNumber(this.phoneNumber);
                    //console.log(user);
                    this.$rootScope.currentUser = user;
                    this.$rootScope.isLogin = true;
                    this.$state.go('tab.account');
                    break;
                }
            case 2:
                this.$ionicPopup.alert({ title: "电话号码不存在" });
                break;
            case 3:
                this.$ionicPopup.alert({ title: "验证码错误" });
                break;
        }
    }
}

angular.module('starter.controllers')
    .controller('ResetPasswordCtrl', ResetPasswordController);
