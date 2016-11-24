///<reference path="../../typings/tsd.d.ts" />
///<reference path="../js/services/registerService.ts" />


describe("myApp", function () {

    var foo: User;
    var http: ng.IHttpService = null;
    var httpBackend: ng.IHttpBackendService = null;
    var parkingService: ParkingService;
    var parkingCtrl:ParkingController;
    var $controller:any;

    async function setupAngularjs(done: any) {
        console.log("dfdffdfdf");
        var md =await angular.module("test", ['ngResource']);
        await md.constant('appConfig', {
            serverPath: 'http://183.239.167.94:8083/api/',
            //serverPath: 'http://localhost:8083/api/',

            updateUrl: 'http://183.239.167.94:8082/',
            carServicePath: 'http://183.239.167.94:8084/api/'

            // updateUrl: 'http://192.168.1.110:8080/'
        })
        await md.service('ParkingService', ParkingService);
        await md.controller('ParkingCtrl', ParkingController);
        // md.service("dfd",function(){
        //     kkkk=$injector.get('$http');
        // });
        //var md = angular.module("starter");
        
        var $injector = angular.injector(['test']);// angular.injector(['starter.services']);
        http = $injector.get('$http');
        parkingService = $injector.get('ParkingService') as ParkingService;
        $injector.instantiate(function(_$controller_:any){
            $controller=_$controller_
        });
        var $rootScope={isLogin:true,currentUser:{vehicles:[{plate:'京A12345'}]}};
        parkingCtrl =await $controller('ParkingCtrl', {$rootScope:$rootScope, $scope:{},$ionicPopup:{alert:()=>{}},$ionicLoading:{},$state:{} }); //$injector.instantiate(ParkingController) as ParkingController; //$injector.get('ParkingCtrl') as ParkingController;
        //await parkingCtrl.GetInCars();
        httpBackend = $injector.get('$httpBackend');
        http.defaults.headers.common.Authorization = "Basic MTg2NzY3MzkxODE6MTExMTE=";

        console.log("ParkingCtrl");
        console.log(parkingCtrl);
        done();
    }

    beforeAll(setupAngularjs);


    it('setup ok', function () {
        expect(http).not.toBeNull();
        expect(httpBackend).not.toBeNull();
        expect(parkingService).not.toBeNull();
        //expect(parkingCtrl).not.toBeNull();
        //expect(parkingCtrl.cars.length).not.toBe(0);
    });

    // describe('getUserByPhoneNumber by mock', function () {
    //     var res: any;

    //     beforeEach(async function (done: any) {
    //         var m = { serverPath: 'http://183.239.167.94:8081/api/' };
    //         var mock: any = {};
    //         mock.get = async (x: string) => { return { data: { password: "11111" } } };
    //         var s: RegisterService = new RegisterService(mock, m);
    //         res = await s.getUserByPhoneNumber("18676739181");
    //         console.log(res);
    //         done();
    //     });

    //     it('password is 11111', function () {
    //         expect(res.password).toBe("11111");
    //     });
    // });

    // describe('getUserByPhoneNumber by http', function () {
    //     var res: any;

    //     beforeEach(async function (done: any) {
    //         var m = { serverPath: 'http://183.239.167.94:8083/api/' };
    //         var s: RegisterService = new RegisterService(http, m);
    //         res = await s.getUserByPhoneNumber("18676739181");
    //         console.log("res is "+res);
    //         done();
    //     });

    //     it('password is 11111', function () {
    //         expect(res.password).toBe("11111");
    //     });
    // });

    describe('parking service',function(){
        var cars:InCarState[];

        beforeEach(async function(done:any){
            let x=new GetCarsParam();
            x.aPlateNo='京A12345';
            let y:GetCarsParam[]=[];
            y.push(x);
            cars =await parkingService.GetInCars(y);
            console.log(cars);
            done();
        });

        it('GetInCars',function(){
            expect(cars.length).not.toBe(0);
        });
    });

    

});