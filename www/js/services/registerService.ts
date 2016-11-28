//import * as jsSHA from "jssha";

class ResponseCode {
    static readonly ok = "ok";
    static readonly fail = "fail";
    static readonly wrongValidCode = "wrongValidCode";
    static readonly phoneExist = "phoneExist";
    static readonly wrongPassword = "wrongPassword";
    static readonly systemError = "systemError";
    static readonly phoneNotExist = "phoneNotExist";
    static readonly noPermission = "noPermission"
}

class RegisterService {
    private $http: ng.IHttpService;
    private appConfig: IAppConfig;

    constructor($http: ng.IHttpService, appConfig: any) {
        this.$http = $http;
        this.appConfig = appConfig;
    }

    async register(phoneNumber: string, validCode: string, password: string): Promise<string> {
        var data = {
            'phoneNumber': phoneNumber,
            'password': password,
            'validCode': validCode
        };
        try {
            var p = await this.$http.post(this.appConfig.serverPath + 'registerService/register', data);
            return p.data as string;
        } catch (err) {
            console.log("catch error in register");
            return ResponseCode.systemError;
        };
    };

    async login(phoneNumber: string, password: string): Promise<string> {
        var data = {
            'phoneNumber': phoneNumber,
            'password': password
        };
        var res = await this.$http.post(this.appConfig.serverPath + 'registerService/login', data);
        //console.log(res);
        return res.data as string;
    };

    async resetPassword(phoneNumber: string, validCode: string, password: string): Promise<number> {
        var data = {
            'phoneNumber': phoneNumber,
            'password': password,
            'validCode': validCode
        };
        try {
            var p = await this.$http.post(this.appConfig.serverPath + 'registerService/resetPassword', data);
            return p.data as number;
        } catch (err) {
            console.log("catch error in resetPassword");
            return -1;
        };
    };

    async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
        let res = await this.$http.get(this.appConfig.serverPath + 'registerService/getUserByPhoneNumber?phoneNumber=' + phoneNumber);
        return res.data as User;
    };

    async changeUserName(phoneNumber: string, name: string): Promise<boolean> {

        var data = {
            'phoneNumber': phoneNumber,
            'name': name
        };
        //encodeURIComponent
        let res = await this.$http.post(this.appConfig.serverPath + 'registerService/changeUserName', data);
        return res.data as boolean;

    };
    async changePassword(phoneNumber: string, oldPassword: string, newPassword: string): Promise<boolean> {
        var data = {
            'phoneNumber': phoneNumber,
            'oldPassword': oldPassword,
            'newPassword': newPassword
        };
        //encodeURIComponent
        let res = await this.$http.post(this.appConfig.serverPath + 'registerService/changePassword', data);
        return res.data as boolean;
    };
}

// class TestSha {

//     x() {
//         var shaObj = new jsSHA("SHA-512", "TEXT");
//         shaObj.update("This is a test");
//         var hash = shaObj.getHash("HEX");
//     }
// }

angular.module('starter.services').service('RegisterService', RegisterService);