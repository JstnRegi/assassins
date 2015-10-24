var app = angular.module('myApp.services', []);

app.factory("AuthService", function($q, $timeout, $http, $window) {
	console.log("AuthService!");
	return ({
		register: register
	})

	function register(newAdmin) {

		var deferred = $q.defer();

		$http.post('/api/admin/register', newAdmin)
			.success(function (res, status) {
				if(status === 200 && res.data) {
					console.log("SUCCESS");
					console.log(res.data);
					deferred.resolve();
				}
			})
			.error(function(res) {
				deferred.reject();
			});

		return deferred.promise;
	}
})