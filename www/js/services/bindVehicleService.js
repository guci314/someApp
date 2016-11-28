var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class VehicleService {
    constructor($http, appConfig) {
        this.$http = $http;
        this.appConfig = appConfig;
    }
    bindPlate(phoneNumber, plate, autoCharge) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'phoneNumber': phoneNumber,
                'plate': plate,
                'autoCharge': autoCharge
            };
            let res = yield this.$http.post(this.appConfig.serverPath + 'vehicleService/bindPlate', data);
            return res.data;
        });
    }
    ;
    findVehiclesByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$http.get(this.appConfig.serverPath + 'vehicleService/findVehiclesByPhoneNumber?phoneNumber=' + phoneNumber);
            return res.data;
        });
    }
    ;
    deleteVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'id': id
            };
            let res = yield this.$http.post(this.appConfig.serverPath + 'vehicleService/deleteVehicle', data);
            return res.data;
        });
    }
    ;
    checkBindStatus(plate) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                'plate': plate
            };
            let res = yield this.$http.post(this.appConfig.serverPath + 'vehicleService/checkBindStatus', data);
            return res.data;
        });
    }
}
angular.module('starter.services').service('VehicleService', VehicleService);
//# sourceMappingURL=bindVehicleService.js.map