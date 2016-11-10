var services = angular.module('starter.services');

function MessageService($http, appConfig) {
	//var Message = $resource(appConfig.serverPath+'messages/:id');

	var service = {};
	service.findMessageByPhoneNumber = function(phoneNumber) {
		function handleResponse(res) {
			return res.data;
		}
		return $http.get(appConfig.serverPath + 'messages/findMessageByPhoneNumber?phoneNumber='+phoneNumber).then(handleResponse);
	};

	service.delete=function(id){
        function handleResponse(res) {
			return res.data;
		}
		return $http.delete(appConfig.serverPath + 'messages/'+id).then(handleResponse);
	};

	return service;
};

MessageService.$inject = ['$http', 'appConfig'];
services.factory('MessageService', MessageService);
