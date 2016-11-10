var services = angular.module('starter.services', ['ngResource']);

//chat service
services.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});


//register service
function RegisterService($http, appConfig) {
    var service = {};
    service.register = function(phoneNumber, validCode, password) {
        function handleResponse(res) {
            return res.data;
        }
        data = {
            'phoneNumber': phoneNumber,
            'password': password,
            'validCode': validCode
        };
        try{
        var p=$http.post(appConfig.serverPath + 'registerService/register', data)
        .then(handleResponse)
        .catch((err)=>{
            console.log("shit");
        });
        return p;
        }catch(err){
            console.log("catch error in register");
          return null;  
        };
    };
    service.login = function(phoneNumber, password) {
        function handleResponse(res) {
            return res.data;
        }　　　　　
        data = {
            'phoneNumber': phoneNumber,
            'password': password
        };
        return $http.post(appConfig.serverPath + 'registerService/login', data).then(handleResponse);
    };
    service.getUserByPhoneNumber = function(phoneNumber) {
        function handleResponse(res) {
            return res.data;
        }
        return $http.get(appConfig.serverPath + 'registerService/getUserByPhoneNumber?phoneNumber=' + phoneNumber).then(handleResponse);
    };
    service.changeUserName = function(phoneNumber, name) {

        data = {
            'phoneNumber': phoneNumber,
            'name': name
        };
        //encodeURIComponent
        return $http.post(appConfig.serverPath + 'registerService/changeUserName', data).success(function(res) {
                return res.data;
            })
            .error(function(err) {
                console.log("修改姓名发生错误");
                return null;
            });
    };
    service.changePassword = function(phoneNumber, oldPassword, newPassword) {
        function handleResponse(res) {
            return res.data;
        }
        data = {
            'phoneNumber': phoneNumber,
            'oldPassword': oldPassword,
            'newPassword': newPassword
        };
        //encodeURIComponent
        return $http.post(appConfig.serverPath + 'registerService/changePassword', data).then(handleResponse);
    };
    return service;
};

RegisterService.$inject = ['$http', 'appConfig'];
services.factory('RegisterService', RegisterService);

function VehicleService($http, appConfig) {
    var service = {};

    service.bindPlate = function(phoneNumber, plate, autoCharge) {
        function handleResponse(res) {
            return res.data;
        }
        data = {
            'phoneNumber': phoneNumber,
            'plate': plate,
            'autoCharge': autoCharge
        };
        return $http.post(appConfig.serverPath + 'vehicleService/bindPlate', data).then(handleResponse);
    };

    service.findVehiclesByPhoneNumber = function(phoneNumber) {
        function handleResponse(res) {
            return res.data;
        }
        return $http.get(appConfig.serverPath + 'vehicleService/findVehiclesByPhoneNumber?phoneNumber=' + phoneNumber).then(handleResponse);
    };

    service.deleteVehicle = function(id) {
        data = {
            'id': id
        };

        function handleResponse(res) {
            return res.data;
        }

        return $http.post(appConfig.serverPath + 'vehicleService/deleteVehicle', data).then(handleResponse);
    };

    return service;
}

VehicleService.$inject = ['$http', 'appConfig'];
services.factory('VehicleService', VehicleService);

function WalletService($http, appConfig) {
    var service = {};

    service.getBalance = function(phoneNumber) {
        data = {
            'phoneNumber': phoneNumber
        };

        function handleResponse(res) {
            return res.data;
        }

        return $http.post(appConfig.serverPath + 'walletService/getBalance', data).then(handleResponse);
    };

    service.deposit = function(phoneNumber, amount) {
        data = {
            'phoneNumber': phoneNumber,
            'amount': amount
        };

        function handleResponse(res) {
            return res.data;
        }

        return $http.post(appConfig.serverPath + 'walletService/deposit', data).then(handleResponse);
    };

    return service;
}

WalletService.$inject = ['$http', 'appConfig'];
services.factory('WalletService', WalletService);