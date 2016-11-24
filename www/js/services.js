var services = angular.module('starter.services', ['ngResource']);

//chat service
services.factory('Chats', function () {
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
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});

function WalletService($http, appConfig) {
    var service = {};

    service.getBalance = function (phoneNumber) {
        data = {
            'phoneNumber': phoneNumber
        };

        function handleResponse(res) {
            return res.data;
        }

        return $http.post(appConfig.serverPath + 'walletService/getBalance', data).then(handleResponse);
    };

    service.deposit = function (phoneNumber, amount) {
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