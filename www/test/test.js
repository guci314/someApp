var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
describe("myApp", function () {
    var foo;
    var http = null;
    var httpBackend = null;
    var parkingService;
    var parkingCtrl;
    var $controller;
    function setupAngularjs(done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("dfdffdfdf");
            var md = yield angular.module("test", ['ngResource']);
            yield md.constant('appConfig', {
                serverPath: 'http://183.239.167.94:8083/api/',
                updateUrl: 'http://183.239.167.94:8082/',
                carServicePath: 'http://183.239.167.94:8084/api/'
            });
            yield md.service('ParkingService', ParkingService);
            yield md.controller('ParkingCtrl', ParkingController);
            var $injector = angular.injector(['test']);
            http = $injector.get('$http');
            parkingService = $injector.get('ParkingService');
            $injector.instantiate(function (_$controller_) {
                $controller = _$controller_;
            });
            var $rootScope = { isLogin: true, currentUser: { vehicles: [{ plate: '京A12345' }] } };
            parkingCtrl = yield $controller('ParkingCtrl', { $rootScope: $rootScope, $scope: {}, $ionicPopup: { alert: () => { } }, $ionicLoading: {}, $state: {} });
            httpBackend = $injector.get('$httpBackend');
            http.defaults.headers.common.Authorization = "Basic MTg2NzY3MzkxODE6MTExMTE=";
            console.log("ParkingCtrl");
            console.log(parkingCtrl);
            done();
        });
    }
    beforeAll(setupAngularjs);
    it('setup ok', function () {
        expect(http).not.toBeNull();
        expect(httpBackend).not.toBeNull();
        expect(parkingService).not.toBeNull();
    });
    describe('parking service', function () {
        var cars;
        beforeEach(function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                let x = new GetCarsParam();
                x.aPlateNo = '京A12345';
                let y = [];
                y.push(x);
                cars = yield parkingService.GetInCars(y);
                console.log(cars);
                done();
            });
        });
        it('GetInCars', function () {
            expect(cars.length).not.toBe(0);
        });
    });
});
//# sourceMappingURL=test.js.map