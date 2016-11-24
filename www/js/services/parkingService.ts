///<reference path="../../../typings/tsd.d.ts" />

/**
 * 车牌号，作为查询参数用
 */
class GetCarsParam{
    aPlateNo:string;
}

/**
 * 车辆状态码
 */
enum CarFlag{
    initial=0,
    execute=1,
    fail=2,
    success=9
}

/**
 * 停车状态
 */
class InCarState {
	binCode: string;
	binKeyCode: string;
	id: number;
	inOutStation: string;
	inTime: string;
	oKFlag: CarFlag;
	plateNo: string;
	stockCode: string;
	stockName: string;
	version: number;
	commitFlag: boolean;
}

/**
 * 取车状态
 */
class OutCarState extends InCarState {
	stayMinutes:number;
	fromId:number;
	money:number;
}

/**
 * 停车记录
 */
class ParkingRecord extends OutCarState{
    inOutKind:number;
}

/**
 * 车辆服务
 */
class ParkingService {
    private $http: ng.IHttpService;
    private appConfig: any;
    private $timeout:ng.ITimeoutService;

    constructor($http: ng.IHttpService,$timeout:any, appConfig: any) {
        this.$http = $http;
        this.appConfig = appConfig;
        this.$timeout=$timeout;
    }

    delay(ms: number) {
		//setTimeout(resolve, ms)
		return new Promise(resolve => this.$timeout(resolve, ms));
	}

    /**
     * 确认停车
     */
    async CommitInCar(aStockCode: string, aPlateNo: string): Promise<InCarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        //encodeURI(aPlateNo)
        let res = await this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'CommitInCar', data);
        return res.data as InCarState;
    };

    /**
     * 轮循20秒查询停车状态
     */
    async checkInCarStatus(aStockCode: string, aPlateNo: string): Promise<number> {
		var stopQuery = false;
		var queryResult: InCarState;
		this.$timeout(() => { stopQuery = true; }, 20000);
		while (!stopQuery) {
			queryResult = await this.GetInCar(aStockCode, aPlateNo);
			console.log(queryResult);
			if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success)) {
				break;
			} else {
				await this.delay(1000);
			};
		};
		return queryResult.oKFlag;
	};

    /**
     * 轮循20秒查询取车状态
     */
    async checkOutCarStatus(aStockCode: string, plateNo: string): Promise<number> {
		var stopQuery = false;
		var queryResult: any
		this.$timeout(() => { stopQuery = true; }, 20000);
		while (!stopQuery) {
			queryResult = await this.GetOutCar(aStockCode, plateNo);
			console.log(queryResult);
			if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success)) {
				break;
			} else {
				await this.delay(1000);
			};
		};
		return queryResult.oKFlag;
	};

    /**
     * 根据一组车牌号获取停车状态
     */
    async GetInCars(plates:GetCarsParam[]): Promise<InCarState[]> {
        //var data ={}; //[{ "aPlateNo": aPlateN }];
        let res = await this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCars', plates);
        return res.data as InCarState[];
    };

    /**
     * 获取停车状态
     */
    async GetInCar(aStockCode: string, aPlateNo: string): Promise<InCarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        let res = await this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCar', data);
        return res.data as InCarState;
    };

    /**
     * 根据一组车牌号获取取车状态
     */
    async GetOutCars(plates:GetCarsParam[]): Promise<OutCarState[]> {
        //var data = {};//{ "aPhone": phoneNumber };
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCars', plates);
        return res.data as OutCarState[];
    };

    /**
     * 获取取车状态
     */
    async GetOutCar(aStockCode: string, aPlateNo: string): Promise<OutCarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCar', data);
        return res.data as OutCarState;
    };

    /**
     * 确认取车
     */
    async CommitOutCar(aStockCode: string, aPlateNo: string): Promise<OutCarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'CommitOutCar', data);
        return res.data as OutCarState;
    };

    /**
     * 根据一组车牌号获取停车记录
     */
    async getParkingRecords(plates:GetCarsParam[]): Promise<ParkingRecord[]> {
        //var data={};//{"aPhone":phoneNumber};
        let res= await this.$http.post(this.appConfig.carServicePath + "InOutLogInterface/" + 'GetInOutLogByPhone',plates);
        //console.log(res);
        return res.data as ParkingRecord[];
    };
}

angular.module('starter.services').service('ParkingService', ParkingService);