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
    //static $inject = ["$rootScope","$ionicPopup","$state","RegisterService"];
    constructor($rootScope, $ionicPopup, $state, RegisterService) {
        this.openEye = true;
        //console.log("ResetPasswordController constructor is called");
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
        });
    }
}
angular.module('starter.controllers')
    .controller('ResetPasswordCtrl', ResetPasswordController);
// angular.module('starter.controllers')
//     .controller('ResetPasswordCtrl',
//     function ($scope: any, $rootScope: any, $ionicPopup: ionic.popup.IonicPopupService, $state: ng.ui.IStateService, RegisterService: any) {
//         $scope.sendData = {
//             phoneNumber: '',
//             valideCode: '',
//             password: ''
//         };
//         $scope.openEye = true;
//         var passwordField = angular.element(document.querySelector('#password'));
//         $scope.showPassword = function () {
//             if ($scope.openEye) {
//                 $scope.openEye = false;
//                 passwordField.attr('type', 'text');
//             } else {
//                 $scope.openEye = true;
//                 passwordField.attr('type', 'password');
//             }
//         };
//         $scope.getAuthcode = function () {
//             $ionicPopup.alert({
//                 title: '验证码已发送,十分钟后失效'
//             });
//         };
//         $scope.resetPassword = function () {
//             var handleResponse = function (data: number) {
//                 switch (data) {
//                     case 1:
//                         {
//                             var alertPopup = $ionicPopup.alert({
//                                 title: '重置密码成功'
//                             });
//                             var saveUser = function (user: any) {
//                                 $rootScope.currentUser = user;
//                                 $rootScope.isLogin = true;
//                                 //console.log(user.phoneNumber);
//                             };
//                             $rootScope.currentUser = {
//                                 'phoneNumber': $scope.sendData.phoneNumber,
//                                 'password': $scope.sendData.password
//                             }
//                             RegisterService.getUserByPhoneNumber($scope.sendData.phoneNumber)
//                                 .then(saveUser)
//                                 .then(function () {
//                                     $state.go('tab.account');
//                                     //$ionicHistory.clearHistory();
//                                 });
//                             break;
//                         }
//                     case 2:
//                         $ionicPopup.alert({ title: "电话号码不存在" });
//                         break;
//                     case 3:
//                         $ionicPopup.alert({ title: "验证码错误" });
//                         break;
//                 }
//             };
//             var handleError = (err: any) => {
//                 $ionicPopup.alert({
//                     title: '重置密码发生错误'
//                 });
//                 console.log(JSON.stringify(err));
//             };
//             RegisterService.resetPassword($scope.sendData.phoneNumber, $scope.sendData.validCode, $scope.sendData.password)
//                 .then(handleResponse)
//                 .catch(handleError);
//         };
//     }) 
//# sourceMappingURL=resetPasswordCtrl.js.map