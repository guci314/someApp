var services = angular.module('starter.services', []);

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

//user service
//function UserService($http,appConfig) {
//
//    var service = {};
//
//    service.GetByPhoneNumber = GetByPhoneNumber;
//    service.Update = Update;
//    
//    usersUrl = appConfig.serverPath+'users';
//    return service;
//
//    function GetByPhoneNumber(phoneNumber) {
//        return $http.get(usersUrl + '?phoneNumber=' +phoneNumber ).then(handleSuccess, handleError('Error getting user by username'));
//    }
//
//    function Update(user) {
//        return $http.put(usersUrl + '/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
//    }
//    
//    // private functions
//
//    function handleSuccess(res) {
//        return res.data;
//    }
//
//    function handleError(error) {
//        return function () {
//            return {
//                success: false,
//                message: error
//            };
//        };
//    }
//
//}
//
//UserService.$inject = ['$http',appConfig];
//services.factory('UserService', UserService);

//register service
function RegisterService($http,appConfig) {
    var service = {};
    service.register = function (phoneNumber, validCode, password) {
        function handleResponse(res) {
            return res.data;
        }
        data = {  
          'phoneNumber': phoneNumber,  
          'password': password,
          'validCode':validCode  
        };
        return $http.post(appConfig.serverPath+'registerService/register',data).then(handleResponse);
    };
    service.login=function(phoneNumber, password){
       function handleResponse(res) {
            return res.data;
        }
　　　　　data = {  
          'phoneNumber': phoneNumber,  
          'password': password  
        };
        return $http.post(appConfig.serverPath+'registerService/login',data).then(handleResponse);  
    };
    service.getUserByPhoneNumber=function (phoneNumber) {
        function handleResponse(res) {
            return res.data;
        }
        return $http.get(appConfig.serverPath + 'registerService/getUserByPhoneNumber?phoneNumber=' +phoneNumber ).then(handleResponse);
    };
    service.changeUserName=function (phoneNumber,name) {
        function handleResponse(res) {
            return res.data;
        }
        data = {  
          'phoneNumber': phoneNumber,  
          'name': name  
        };  
        //encodeURIComponent
        return $http.post(appConfig.serverPath + 'registerService/changeUserName',data).then(handleResponse);
    };
    return service;
}
RegisterService.$inject = ['$http','appConfig'];
services.factory('RegisterService', RegisterService);
