///<reference path="../../../typings/tsd.d.ts" />

var services = angular.module('starter.services');

/**
 * @param {angular.IHttpService} $http
 */
function ParkingService($http, appConfig) {
	var service = {};
	
	service.CommitInCar=function(aPhone,aPlateNo){
        return $http.post(appConfig.carServicePath+"InCarInterface/" + 'CommitInCar?aPhone=' + aPhone+'&aPlateNo='+encodeURI(aPlateNo))
			.then(function (res) {
				return res.data;
			});
	};

	service.GetInCars = function (phoneNumber) {
		return $http.post(appConfig.carServicePath+"InCarInterface/" + 'GetInCars?aPhone=' + phoneNumber)
			.then(function (res) {
				return res.data;
			});
	};

	service.GetInCar = function (aPhone,aPlateNo) {
		return $http.post(appConfig.carServicePath+"InCarInterface/" + 'GetInCar?aPhone=' + aPhone+'&aPlateNo='+encodeURI(aPlateNo))
			.then(function (res) {
				return res.data;
			});
	};

    service.GetOutCars = function (phoneNumber) {
		return $http.post(appConfig.carServicePath+"OutCarInterface/" + 'GetOutCars?aPhone=' + phoneNumber)
			.then(function (res) {
				//console.log(res.data);
				return res.data;
			});
	};

	service.GetOutCar = function (aPhone,aPlateNo) {
		return $http.post(appConfig.carServicePath+"OutCarInterface/" + 'GetOutCar?aPhone=' + aPhone+'&aPlateNo='+encodeURI(aPlateNo))
			.then(function (res) {
				return res.data;
			});
	};

    service.CommitOutCar=function(aPhone,aPlateNo){
        return $http.post(appConfig.carServicePath+"OutCarInterface/" + 'CommitOutCar?aPhone=' + aPhone+'&aPlateNo='+encodeURI(aPlateNo))
			.then(function (res) {
				return res.data;
			});
	};

	// service.requestPickup = function (phoneNumber) {
	// 	function handleResponse(res) {
	// 		return res.data;
	// 	}
	// 	data = {
	// 		'phoneNumber': phoneNumber
	// 	};

	// 	return $http.post(appConfig.serverPath + 'parkingService/requestPickup', data).then(handleResponse);
	// };

	// service.getParkingRecords = function (phoneNumber) {
	// 	function handleResponse(res) {
	// 		return res.data;
	// 	}
	// 	data = {
	// 		'phoneNumber': phoneNumber
	// 	};
	// 	return $http.post(appConfig.serverPath + 'parkingService/getParkingRecords', data).then(handleResponse);
	// };

	return service;
};

ParkingService.$inject = ['$http', 'appConfig'];
services.factory('ParkingService', ParkingService);

// function QueryFeeService($http, appConfig) {
// 	var service = {};
// 	service.queryFee = function (phoneNumber) {
// 		function handleResponse(res) {
// 			return res.data;
// 		}
// 		data = {
// 			'phoneNumber': phoneNumber
// 		};
// 		return $http.post(appConfig.serverPath + 'parkingService/queryFee', data).then(handleResponse);
// 	};

// 	return service;
// };

// QueryFeeService.$inject = ['$http', 'appConfig'];
// services.factory('QueryFeeService', QueryFeeService);
