class VehicleService{
    private $http: ng.IHttpService;
    private appConfig: any;

    constructor($http: ng.IHttpService, appConfig: any) {
        this.$http = $http;
        this.appConfig = appConfig;
    }

    async bindPlate(phoneNumber:string, plate:string, autoCharge:boolean):Promise<Vehicle> {
        var data = {
            'phoneNumber': phoneNumber,
            'plate': plate,
            'autoCharge': autoCharge
        };

        let res= await this.$http.post(this.appConfig.serverPath + 'vehicleService/bindPlate', data);
        return res.data as Vehicle;
    };

    async findVehiclesByPhoneNumber (phoneNumber:string):Promise<Vehicle> {
        let res= await this.$http.get(this.appConfig.serverPath + 'vehicleService/findVehiclesByPhoneNumber?phoneNumber=' + phoneNumber);
        return res.data as Vehicle;
    };

    async deleteVehicle(id:number):Promise<boolean> {
        var data = {
            'id': id
        };

        let res=await this.$http.post(this.appConfig.serverPath + 'vehicleService/deleteVehicle', data);
        return res.data as boolean;
    };
}

angular.module('starter.services').service('VehicleService', VehicleService);
