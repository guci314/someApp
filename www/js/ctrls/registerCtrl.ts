
class RegiserController {
    private $rootScope: IParkingRootScope;
    private $ionicPopup: ionic.popup.IonicPopupService;
    private $state: ng.ui.IStateService;
    private RegisterService: RegisterService;

    constructor($rootScope: any, $ionicPopup: any, $state: any, RegisterService: any) {
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.RegisterService = RegisterService;
    }

    phoneNumber: string;
    validCode: string;
    password: string;
    openEye: boolean;
    passwordField = angular.element(document.querySelector('#password'));

    getAuthcode() {
        this.$ionicPopup.alert({
            title: '验证码已发送'
        });
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

    async register() {
        let data: string = await this.RegisterService.register(this.phoneNumber, this.validCode, this.password);
        switch (data) {
            case ResponseCode.ok: {
                this.$ionicPopup.alert({
                    title: '注册成功'
                });
                this.$rootScope.currentUser = {
                    'phoneNumber': this.phoneNumber,
                    'password': this.password
                }
                let user = await this.RegisterService.getUserByPhoneNumber(this.phoneNumber);
                this.$rootScope.currentUser = user;
                this.$rootScope.isLogin = true;

                this.$state.go('tab.account');
                break;
            }
            case ResponseCode.phoneExist: {
                this.$ionicPopup.alert({
                    title: '电话号码已存在'
                });
                break;
            }
            case ResponseCode.wrongValidCode: {
                this.$ionicPopup.alert({
                    title: '验证码错误'
                });
                break;
            }
            default: {
                this.$ionicPopup.alert({
                    title: '注册失败'
                });
            }
        }
    };
}

angular.module('starter.controllers').controller('RegisterCtrl', RegiserController);