var services = angular.module('starter.services', []);

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

//user service
function UserService($http) {

	var service = {};

	service.GetAll = GetAll;
	service.GetById = GetById;
	service.GetByUsername = GetByUsername;
	service.Create = Create;
	service.Update = Update;
	service.Delete = Delete;
	usersUrl = 'http://localhost:8081/api/users';
	return service;

	function GetAll() {
		return $http.get(usersUrl).then(handleSuccess, handleError('Error getting all users'));
	}

	function GetById(id) {
		return $http.get(usersUrl + '/' + id).then(handleSuccess, handleError('Error getting user by id'));
	}

	function GetByUsername(username) {
		return $http.get(usersUrl + '/' + username).then(handleSuccess, handleError('Error getting user by username'));
	}

	function Create(user) {
		return $http.post(usersUrl, user).then(handleSuccess, handleError('Error creating user'));
	}

	function Update(user) {
		return $http.put(usersUrl + '/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
	}

	function Delete(id) {
		return $http.delete(usersUrl + '/' + id).then(handleSuccess, handleError('Error deleting user'));
	}

	// private functions

	function handleSuccess(res) {
		return res.data;
	}

	function handleError(error) {
		return function() {
			return {
				success : false,
				message : error
			};
		};
	}

}

UserService.$inject = ['$http'];
services.factory('UserService', UserService);
