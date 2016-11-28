///<reference path="../services/registerService.ts" />
///<reference path="resetPasswordCtrl.ts"/>

class LoginController {
    private $rootScope: IParkingRootScope;
    private $ionicPopup: ionic.popup.IonicPopupService;
    private $state: ng.ui.IStateService;
    private registerService: RegisterService;

    constructor($rootScope: any, $ionicPopup: any, $state: any, RegisterService: any) {
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.registerService = RegisterService;
    }

    phoneNumber: string;
    password: string;
    openEye: boolean;

    passwordField = angular.element(document.querySelector('#password'));

    async login() {
        let res = await this.registerService.login(this.phoneNumber, this.password);
        switch (res) {
            case ResponseCode.ok: {
                this.$ionicPopup.alert({
                    title: '登录成功'
                });
                this.$rootScope.currentUser = {
                    'phoneNumber': this.phoneNumber,
                    'password': this.password
                }
                let user = await this.registerService.getUserByPhoneNumber(this.phoneNumber);
                this.$rootScope.currentUser = user;
                this.$rootScope.isLogin = true;
                this.$state.go('tab.account');
                break;
            }
            case ResponseCode.phoneNotExist: {
                this.$ionicPopup.alert({
                    title: '电话号码不存在'
                });
                break;
            }
            case ResponseCode.wrongPassword: {
                this.$ionicPopup.alert({
                    title: '密码错误'
                });
                break;
            }
            default: {
                this.$ionicPopup.alert({
                    title: '登录失败'
                });
            }
        };
    };

    showPassword() {
        if (this.openEye) {
            this.openEye = false;
            this.passwordField.attr('type', 'text');
        } else {
            this.openEye = true;
            this.passwordField.attr('type', 'password');
        }
    };
}

angular.module('starter.controllers').controller('LoginCtrl', LoginController);

