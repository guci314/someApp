var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class RegisterService {
    constructor($http, appConfig) {
        this.$http = $http;
        this.appConfig = appConfig;
    }
    register(phoneNumber, validCode, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'phoneNumber': phoneNumber,
                'password': password,
                'validCode': validCode
            };
            try {
                var p = yield this.$http.post(this.appConfig.serverPath + 'registerService/register', data);
                return p.data;
            }
            catch (err) {
                console.log("catch error in register");
                return false;
            }
            ;
        });
    }
    ;
    login(phoneNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'phoneNumber': phoneNumber,
                'password': password
            };
            var res = yield this.$http.post(this.appConfig.serverPath + 'registerService/login', data);
            return res.data;
        });
    }
    ;
    resetPassword(phoneNumber, validCode, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'phoneNumber': phoneNumber,
                'password': password,
                'validCode': validCode
            };
            try {
                var p = yield this.$http.post(this.appConfig.serverPath + 'registerService/resetPassword', data);
                return p.data;
            }
            catch (err) {
                console.log("catch error in resetPassword");
                return -1;
            }
            ;
        });
    }
    ;
    getUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$http.get(this.appConfig.serverPath + 'registerService/getUserByPhoneNumber?phoneNumber=' + phoneNumber);
            return res.data;
        });
    }
    ;
    changeUserName(phoneNumber, name) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'phoneNumber': phoneNumber,
                'name': name
            };
            let res = yield this.$http.post(this.appConfig.serverPath + 'registerService/changeUserName', data);
            return res.data;
        });
    }
    ;
    changePassword(phoneNumber, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'phoneNumber': phoneNumber,
                'oldPassword': oldPassword,
                'newPassword': newPassword
            };
            let res = yield this.$http.post(this.appConfig.serverPath + 'registerService/changePassword', data);
            return res.data;
        });
    }
    ;
}
angular.module('starter.services').service('RegisterService', RegisterService);
//# sourceMappingURL=registerService.js.map