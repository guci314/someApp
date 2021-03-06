///<reference path="../services/registerService.ts" />
///<reference path="resetPasswordCtrl.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class LoginController {
    constructor($rootScope, $ionicPopup, $state, RegisterService) {
        this.passwordField = angular.element(document.querySelector('#password'));
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.registerService = RegisterService;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.registerService.login(this.phoneNumber, this.password);
            switch (res) {
                case ResponseCode.ok: {
                    this.$ionicPopup.alert({
                        title: '登录成功'
                    });
                    this.$rootScope.currentUser = {
                        'phoneNumber': this.phoneNumber,
                        'password': this.password
                    };
                    let user = yield this.registerService.getUserByPhoneNumber(this.phoneNumber);
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
            }
            ;
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
}
angular.module('starter.controllers').controller('LoginCtrl', LoginController);
//# sourceMappingURL=loginCtrl.js.map