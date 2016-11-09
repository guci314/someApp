var services = angular.module('starter.services');

function ParkingService($http, appConfig) {
	var service = {};
	service.requestParking = function(phoneNumber) {
		function handleResponse(res) {
			return res.data;
		}
		data = {
			'phoneNumber': phoneNumber
		};
		return $http.post(appConfig.serverPath + 'parkingService/requestParking', data).then(handleResponse);
	};

	service.requestPickup = function(phoneNumber) {
		function handleResponse(res) {
			return res.data;
		}
		data = {
			'phoneNumber': phoneNumber
		};
		return $http.post(appConfig.serverPath + 'parkingService/requestPickup', data).then(handleResponse);
	};

	service.getParkingRecords = function(phoneNumber) {
		function handleResponse(res) {
			return res.data;
		}
		data = {
			'phoneNumber': phoneNumber
		};
		return $http.post(appConfig.serverPath + 'parkingService/getParkingRecords', data).then(handleResponse);
	};

	return service;
};

ParkingService.$inject = ['$http', 'appConfig'];
services.factory('ParkingService', ParkingService);

function QueryFeeService($http, appConfig) {
	var service = {};
	service.queryFee = function(phoneNumber) {
		function handleResponse(res) {
			return res.data;
		}
		data = {
			'phoneNumber': phoneNumber
		};
		return $http.post(appConfig.serverPath + 'parkingService/queryFee', data).then(handleResponse);
	};

	return service;
};

QueryFeeService.$inject = ['$http', 'appConfig'];
services.factory('QueryFeeService', QueryFeeService);
