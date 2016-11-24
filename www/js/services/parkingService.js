var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class GetCarsParam {
}
var CarFlag;
(function (CarFlag) {
    CarFlag[CarFlag["initial"] = 0] = "initial";
    CarFlag[CarFlag["execute"] = 1] = "execute";
    CarFlag[CarFlag["fail"] = 2] = "fail";
    CarFlag[CarFlag["success"] = 9] = "success";
})(CarFlag || (CarFlag = {}));
class InCarState {
}
class OutCarState extends InCarState {
}
class ParkingRecord extends OutCarState {
}
class ParkingService {
    constructor($http, $timeout, appConfig) {
        this.$http = $http;
        this.appConfig = appConfig;
        this.$timeout = $timeout;
    }
    delay(ms) {
        return new Promise(resolve => this.$timeout(resolve, ms));
    }
    CommitInCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'CommitInCar', data);
            return res.data;
        });
    }
    ;
    checkInCarStatus(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var stopQuery = false;
            var queryResult;
            this.$timeout(() => { stopQuery = true; }, 20000);
            while (!stopQuery) {
                queryResult = yield this.GetInCar(aStockCode, aPlateNo);
                console.log(queryResult);
                if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success)) {
                    break;
                }
                else {
                    yield this.delay(1000);
                }
                ;
            }
            ;
            return queryResult.oKFlag;
        });
    }
    ;
    checkOutCarStatus(aStockCode, plateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var stopQuery = false;
            var queryResult;
            this.$timeout(() => { stopQuery = true; }, 20000);
            while (!stopQuery) {
                queryResult = yield this.GetOutCar(aStockCode, plateNo);
                console.log(queryResult);
                if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success)) {
                    break;
                }
                else {
                    yield this.delay(1000);
                }
                ;
            }
            ;
            return queryResult.oKFlag;
        });
    }
    ;
    GetInCars(plates) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCars', plates);
            return res.data;
        });
    }
    ;
    GetInCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCar', data);
            return res.data;
        });
    }
    ;
    GetOutCars(plates) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCars', plates);
            return res.data;
        });
    }
    ;
    GetOutCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCar', data);
            return res.data;
        });
    }
    ;
    CommitOutCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'CommitOutCar', data);
            return res.data;
        });
    }
    ;
    getParkingRecords(plates) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$http.post(this.appConfig.carServicePath + "InOutLogInterface/" + 'GetInOutLogByPhone', plates);
            return res.data;
        });
    }
    ;
}
angular.module('starter.services').service('ParkingService', ParkingService);
//# sourceMappingURL=parkingService.js.map