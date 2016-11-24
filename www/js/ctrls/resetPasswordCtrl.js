var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class User {
}
class Vehicle {
}
class ResetPasswordController {
    constructor($rootScope, $ionicPopup, $state, RegisterService) {
        this.openEye = true;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$state = $state;
        this.RegisterService = RegisterService;
    }
    showPassword() {
        let passwordField = angular.element(document.querySelector('#password'));
        if (this.openEye) {
            this.openEye = false;
            passwordField.attr('type', 'text');
        }
        else {
            this.openEye = true;
            passwordField.attr('type', 'password');
        }
    }
    getAuthcode() {
        this.$ionicPopup.alert({
            title: '验证码已发送,十分钟后失效'
        });
    }
    resetPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            let code = yield this.RegisterService.resetPassword(this.phoneNumber, this.valideCode, this.password);
            switch (code) {
                case 1:
                    {
                        this.$ionicPopup.alert({
                            title: '重置密码成功'
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
                case 2:
                    this.$ionicPopup.alert({ title: "电话号码不存在" });
                    break;
                case 3:
                    this.$ionicPopup.alert({ title: "验证码错误" });
                    break;
            }
        });
    }
}
angular.module('starter.controllers')
    .controller('ResetPasswordCtrl', ResetPasswordController);
//# sourceMappingURL=resetPasswordCtrl.js.map