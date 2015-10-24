var app = angular.module('myApp.services', []);

app.factory("AuthService", function($q, $timeout, $http, $window) {
	console.log("AuthService!");
	return ({
		register: register
	})

	function register(newAdmin) {
		console.log(newAdmin);
	}
})