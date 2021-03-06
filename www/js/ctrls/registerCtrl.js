var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class RegiserController {
    constructor($rootScope, $ionicPopup, $state, RegisterService) {
        this.passwordField = angular.element(document.querySelector('#password'));
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.RegisterService = RegisterService;
    }
    getAuthcode() {
        this.$ionicPopup.alert({
            title: '验证码已发送'
        });
    }
    ;
    showPassword() {
        if (this.openEye) {
            this.openEye = false;
            this.passwordField.attr('type', 'text');
        }
        else {
            this.openEye = true;
            this.passwordField.attr('type', 'password');
        }
    }
    ;
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.RegisterService.register(this.phoneNumber, this.validCode, this.password);
            switch (data) {
                case ResponseCode.ok: {
                    this.$ionicPopup.alert({
                        title: '注册成功'
                    });
                    this.$rootScope.currentUser = {
                        'phoneNumber': this.phoneNumber,
                        'password': this.password
                    };
                    let user = yield this.RegisterService.getUserByPhoneNumber(this.phoneNumber);
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
        });
    }
    ;
}
angular.module('starter.controllers').controller('RegisterCtrl', RegiserController);
//# sourceMappingURL=registerCtrl.js.map