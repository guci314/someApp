var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * 车牌号，作为查询参数用
 */
class GetCarsParam {
}
/**
 * 车辆状态码
 */
var CarFlag;
(function (CarFlag) {
    CarFlag[CarFlag["initial"] = 0] = "initial";
    CarFlag[CarFlag["execute"] = 1] = "execute";
    CarFlag[CarFlag["fail"] = 2] = "fail";
    CarFlag[CarFlag["success"] = 9] = "success";
})(CarFlag || (CarFlag = {}));
/**
 * 车辆状态
 */
class CarState {
}
/**
 * 车辆服务
 */
class ParkingService {
    constructor($http, $timeout, appConfig) {
        this.$http = $http;
        this.appConfig = appConfig;
        this.$timeout = $timeout;
    }
    delay(ms) {
        //setTimeout(resolve, ms)
        return new Promise(resolve => this.$timeout(resolve, ms));
    }
    /**
     * 确认停车
     */
    CommitInCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            //encodeURI(aPlateNo)
            let res = yield this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'CommitInCar', data);
            return res.data;
        });
    }
    ;
    /**
     * 轮循20秒查询停车状态
     */
    checkInCarStatus(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var stopQuery = false;
            var queryResult;
            this.$timeout(() => { stopQuery = true; }, 20000);
            while (!stopQuery) {
                queryResult = yield this.GetInCar(aStockCode, aPlateNo);
                //console.log(queryResult);
                if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success) || (queryResult.oKFlag === CarFlag.initial)) {
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
    /**
     * 轮循20秒查询取车状态
     */
    checkOutCarStatus(aStockCode, plateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var stopQuery = false;
            var queryResult;
            this.$timeout(() => { stopQuery = true; }, 20000);
            while (!stopQuery) {
                queryResult = yield this.GetOutCar(aStockCode, plateNo);
                //console.log(queryResult);
                if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success) || (queryResult.oKFlag === CarFlag.initial)) {
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
    /**
     * 根据一组车牌号获取停车状态
     */
    GetInCars(plates) {
        return __awaiter(this, void 0, void 0, function* () {
            //var data ={}; //[{ "aPlateNo": aPlateN }];
            let res = yield this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCars', plates);
            return res.data;
        });
    }
    ;
    /**
     * 获取停车状态
     */
    GetInCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCar', data);
            return res.data;
        });
    }
    ;
    /**
     * 根据一组车牌号获取取车状态
     */
    GetOutCars(plates) {
        return __awaiter(this, void 0, void 0, function* () {
            //var data = {};//{ "aPhone": phoneNumber };
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCars', plates);
            return res.data;
        });
    }
    ;
    /**
     * 获取取车状态
     */
    GetOutCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCar', data);
            return res.data;
        });
    }
    ;
    /**
     * 确认取车
     */
    CommitOutCar(aStockCode, aPlateNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'CommitOutCar', data);
            return res.data;
        });
    }
    ;
    /**
     * 获取取车验证码
     */
    GetConfirmationCode(aStockCode) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = { "aStockCode": aStockCode };
            let res = yield this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetConfirmationCode', data);
            return res.data;
        });
    }
    /**
     * 根据一组车牌号获取停车记录
     */
    getParkingRecords(plates) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.$http.post(this.appConfig.carServicePath + "InOutLogInterface/" + 'GetInOutLogByPhone', plates);
            return res.data;
        });
    }
    ;
    /**
     * 分页获取存取车记录
     */
    getRecordsByPageNo(aPageNo, aPageSize, Plates) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = { "aPageNo": aPageNo, "aPageSize": aPageSize, "Plates": Plates };
            let res = yield this.$http.post(this.appConfig.carServicePath + "InOutLogInterface/" + 'GetInOutLogsPage', data);
            return res.data;
        });
    }
}
angular.module('starter.services').service('ParkingService', ParkingService);
//# sourceMappingURL=parkingService.js.map