

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
 * 车辆状态
 */
class CarState {
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

    stayMinutes:number;
	fromId:number;
	money:number;

    inOutKind:number;
}

/**
 * 全局配置
 */
interface IAppConfig{
    serverPath:string;
    updateUrl:string;
    carServicePath:string;
}

/**
 * 车辆服务
 */
class ParkingService {
    private $http: ng.IHttpService;
    private appConfig: IAppConfig;
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
    async CommitInCar(aStockCode: string, aPlateNo: string): Promise<CarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        //encodeURI(aPlateNo)
        let res = await this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'CommitInCar', data);
        return res.data as CarState;
    };

    /**
     * 轮循20秒查询停车状态
     */
    async checkInCarStatus(aStockCode: string, aPlateNo: string): Promise<number> {
		var stopQuery = false;
		var queryResult: CarState;
		this.$timeout(() => { stopQuery = true; }, 20000);
		while (!stopQuery) {
			queryResult = await this.GetInCar(aStockCode, aPlateNo);
			//console.log(queryResult);
			if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success) || (queryResult.oKFlag === CarFlag.initial)) {
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
			//console.log(queryResult);
			if ((queryResult.oKFlag === CarFlag.fail) || (queryResult.oKFlag === CarFlag.success) || (queryResult.oKFlag === CarFlag.initial)) {
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
    async GetInCars(plates:GetCarsParam[]): Promise<CarState[]> {
        //var data ={}; //[{ "aPlateNo": aPlateN }];
        let res = await this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCars', plates);
        return res.data as CarState[];
    };

    /**
     * 获取停车状态
     */
    async GetInCar(aStockCode: string, aPlateNo: string): Promise<CarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        let res = await this.$http.post(this.appConfig.carServicePath + "InCarInterface/" + 'GetInCar', data);
        return res.data as CarState;
    };

    /**
     * 根据一组车牌号获取取车状态
     */
    async GetOutCars(plates:GetCarsParam[]): Promise<CarState[]> {
        //var data = {};//{ "aPhone": phoneNumber };
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCars', plates);
        return res.data as CarState[];
    };

    /**
     * 获取取车状态
     */
    async GetOutCar(aStockCode: string, aPlateNo: string): Promise<CarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetOutCar', data);
        return res.data as CarState;
    };

    /**
     * 确认取车
     */
    async CommitOutCar(aStockCode: string, aPlateNo: string): Promise<CarState> {
        var data = { "aStockCode": aStockCode, "aPlateNo": aPlateNo };
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'CommitOutCar', data);
        return res.data as CarState;
    };

    /**
     * 获取取车验证码
     */
    async GetConfirmationCode(aStockCode:string):Promise<string>{
        var data = { "aStockCode": aStockCode};
        let res = await this.$http.post(this.appConfig.carServicePath + "OutCarInterface/" + 'GetConfirmationCode', data);
        return res.data as string;
    }

    /**
     * 根据一组车牌号获取停车记录
     */
    async getParkingRecords(plates:GetCarsParam[]): Promise<CarState[]> {
        let res= await this.$http.post(this.appConfig.carServicePath + "InOutLogInterface/" + 'GetInOutLogByPhone',plates);
        return res.data as CarState[];
    };

    /**
     * 分页获取存取车记录
     */
    async getRecordsByPageNo(aPageNo:number,aPageSize:number,Plates:GetCarsParam[]){
        let data={"aPageNo":aPageNo,"aPageSize":aPageSize,"Plates":Plates};
        let res= await this.$http.post(this.appConfig.carServicePath + "InOutLogInterface/" + 'GetInOutLogsPage',data);
        return res.data as CarState[];
    }
}

angular.module('starter.services').service('ParkingService', ParkingService);