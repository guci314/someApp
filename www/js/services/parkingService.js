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

	return service;
};

ParkingService.$inject = ['$http', 'appConfig'];
services.factory('ParkingService', ParkingService);