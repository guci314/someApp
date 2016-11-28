///<reference path="../../typings/tsd.d.ts" />
///<reference path="../js/services/registerService.ts" />
///<reference path="../js/services/parkingService.ts"/>

describe("myApp", function () {

    var foo: User;
    var http: ng.IHttpService;
    var httpBackend: ng.IHttpBackendService;
    var parkingService: ParkingService;
    var parkingCtrl: ParkingController;
    var registerService:RegisterService;
    var $controller: any;

    async function setupAngularjs(done: any) {
        //var md=await angular.module("starter");
        var md = await angular.module("test", ['ngResource']);
        await md.constant('appConfig', {
            serverPath: 'http://183.239.167.94:8083/api/',
            updateUrl: 'http://183.239.167.94:8082/',
            carServicePath: 'http://183.239.167.94:8084/api/'
        })
        await md.service('ParkingService', ParkingService);
        await md.service('RegisterService', RegisterService);
        await md.controller('ParkingCtrl', ParkingController);
        
        // md.service("dfd",function(){
        //     kkkk=$injector.get('$http');
        // });
        //var md = angular.module("starter");

        var $injector = angular.injector(['test']);// angular.injector(['starter.services']);
        http = $injector.get('$http');
        parkingService = $injector.get('ParkingService') as ParkingService;
        registerService = $injector.get('RegisterService') as RegisterService;
        parkingCtrl=$injector.get('RegisterService') as ParkingController;
        // $injector.instantiate(function (_$controller_: any) {
        //     $controller = _$controller_
        // });
        // var $rootScope={isLogin:true,currentUser:{vehicles:[{plate:'京A12345'}]}};
        // parkingCtrl =await $controller('ParkingCtrl', {$rootScope:$rootScope, $scope:{},$ionicPopup:{alert:()=>{}},$ionicLoading:{},$state:{} }); //$injector.instantiate(ParkingController) as ParkingController; //$injector.get('ParkingCtrl') as ParkingController;
        //await parkingCtrl.GetInCars();
        httpBackend = $injector.get('$httpBackend');
        http.defaults.headers.common.Authorization = "Basic MTg2NzY3MzkxODE6MTExMTE=";

        done();
    }

    beforeAll(setupAngularjs);


    it('setup ok', function () {
        expect(http).toBeDefined();
        expect(httpBackend).toBeDefined();
        expect(parkingService).toBeDefined();
        expect(parkingCtrl).toBeDefined();
        expect(registerService).toBeDefined();
        //expect(parkingCtrl.cars.length).not.toBe(0);
    });

    describe('async function', function () {
        async function f1() {
            var b = true;
            if (b) {
                throw new Error('error message');
            } else {
                return 5;
            }
        }

        var x = 0;

        beforeEach(async function (done) {
            // try {
            //     x = await f1();
            //     console.log('after f1()');
            // } catch (e) {
            //     console.log(e.message);
            // };
            f1().then((v)=>{console.log(v)},(e)=>{console.log(e.message)});
            done();
        })

        it('true tobe true', function () {
            expect(true).toBe(true);
        })
    })

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


    describe('parking service',function(){
        var cars:CarState[];

        beforeEach(async function(done:any){
            let x=new GetCarsParam();
            x.aPlateNo='京A12345';
            let y:GetCarsParam[]=[];
            y.push(x);
            cars =await parkingService.GetInCars(y);
            //console.log(cars);
            done();
        });

        it('GetInCars',function(){
            expect(cars).toBeDefined();
        });
    });

    describe("RegisterService",function(){
        var user:User;
        beforeEach(async function(done:any){
            user= await registerService.getUserByPhoneNumber('18676739181');
            done();
        })

        it('user password toBe 11111',function(){
            //console.log(user);
            expect(user.password).toBe('11111');
        })
    })

});