var app = angular.module('myApp.services', []);

app.service('GameService', function ($http, $routeParams, $window, $resource) {
  return ({
  	findGameAdmin: findGameAdmin,
  	findGameAssassin: findGameAssassin,
  	resource: resource
  });

	function findGameAdmin() {
		var promise = $http.get('/api/assassin/game/' + $routeParams._id)
		// handle success
		.success(function (res, status) {
			if(status === 200 && res.data){
				return res.data
			}
		})
		// handle error
		.error(function (res) {
			console.log(res);
		});

		return promise;
	}

  	function findGameAssassin() {
  		console.log($window.assassin);
	  	var promise = $http.get('/api/assassin/game/' + $window.assassin.game)
        // handle success
        .success(function (res, status) {
			if(status === 200 && res.data){
	            return res.data;
	            // $rootScope.$broadcast("found assassin game");
	          }
	        })
	          // handle error
	        .error(function (res) {
	          console.log(res);
	        });
        return promise;
  	}

  	function resource() {
  		return $resource('/api/games/:data', { data: '@data' });
  	}
  	
  	
});

app.service('AdminGamesService', function ($resource) {
  return $resource('/api/admin/:admin/games', { admin: '@admin' });
});

app.factory("AuthService", function($q, $timeout, $http, $window) {
	
	// decalare global admin variable
	$window.admin = $window.admin || null;

	//return available functions for use in controllers
	return ({
		register: register,
		adminLogin: adminLogin,
		isLoggedIn: isLoggedIn,
		getAdminStatus: getAdminStatus,
		logout: logout,
		currentAdmin: currentAdmin
	});

	function isLoggedIn() {
      return !!$window.admin;
  	}

	function getAdminStatus() {
		return $window.admin;
	}

	function register(newAdmin) {

		var deferred = $q.defer();

		$http.post('/api/admin/register', newAdmin)
			.success(function (res, status) {
				if(status === 200 && res.data) {
					admin = res.data;
					deferred.resolve();
				}
			})
			.error(function(res) {
				deferred.reject();
			});

		return deferred.promise;
	};

	function adminLogin(adminInfo) {
		// create a new instance of deferred
    	var deferred = $q.defer();

	    // send a post request to the server
	    $http.post('/api/admin/login', adminInfo)
	      // handle success
	      .success(function (res, status) {
	        if(status === 200 && res.data){
	          $window.admin = res.data;
	          deferred.resolve();
	        } else {
	          $window.admin = null;
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        $window.admin = null;
	        deferred.reject();
	      });

	    // return promise object
	    return deferred.promise;
	};

	function logout() {

	    // create a new instance of deferred
	    var deferred = $q.defer();

	    // send a get request to the server
	    $http.get('/api/admin/logout')
	      // handle success
	      .success(function (res) {
	        $window.admin = null;
	        deferred.resolve();
	      })
	      // handle error
	      .error(function (res) {
	        $window.admin = null;
	        deferred.reject();
	      });

	    // return promise object
	    return deferred.promise;
	}

	function currentAdmin() {
		
		// create a new instance of deferred
	    var deferred = $q.defer();

	    // send a get request to the server
	    $http.get('/api/admin')
	      // handle success
	      .success(function (res, status) {
	        if(status === 200 && res.data){
	          $window.admin = res.data;
	          deferred.resolve();
	        } else {
	          $window.admin = null;
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        $window.admin = null;
	        deferred.reject();
	      });

	    // return promise object
	    return deferred.promise;
	};
});


app.factory("AssassinAuthService", function($q, $timeout, $http, $window) {
	
	// decalare global assassin variable
	$window.assassin = $window.assassin || null;

	//return available functions for use in controllers
	return ({
		gameRegister: gameRegister,
		register: register,
		assassinGameLogin: assassinGameLogin,
		assassinLogin: assassinLogin,
		isAssassinLoggedIn: isAssassinLoggedIn,
		currentAssassin: currentAssassin,
		logout: logout
	});

	function isAssassinLoggedIn() {
		return !!$window.assassin;
	}

	function gameRegister(newAssassin, game) {

		var deferred = $q.defer();

		$http.post('/api/assassins/' + game + '/register', newAssassin)
			.success(function (res, status) {
				if(status === 200 && res.data) {
					assassin = res.data;
					deferred.resolve();
					$window.assassin = assassin;
				}
				})
			.error(function(res) {
				deferred.reject(res);
			});

		return deferred.promise;

	};

	function register(newAssassin) {

		var deferred = $q.defer();

		$http.post('/api/assassins/register', newAssassin)
			.success(function (res, status) {
				if(status === 200 && res.data) {
					assassin = res.data;
					deferred.resolve();
					$window.assassin = assassin;
				}
				})
			.error(function(res) {
				deferred.reject(res);
			});

		return deferred.promise;

	};

	function assassinGameLogin(assassinInfo) {


		// create a new instance of deferred
    	var deferred = $q.defer();

	    // send a post request to the server
	    $http.post('/api/assassin/login', assassinInfo)
	      // handle success
	      .success(function (res, status) {
	        if(status === 200 && res.data){
	          $window.assassin = res.data;
	          deferred.resolve();
	        } else {
	          $window.assassin = null;
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        $window.assassin = null;
	        deferred.reject(res);
	      });

	    // return promise object
	    return deferred.promise;
	};

	function assassinLogin(assassinInfo) {


		// create a new instance of deferred
    	var deferred = $q.defer();

	    // send a post request to the server
	    $http.post('/api/assassin/login', assassinInfo)
	      // handle success
	      .success(function (res, status) {
	        if(status === 200 && res.data){
	          $window.assassin = res.data;
	          deferred.resolve();
	        } else {
	          $window.assassin = null;
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        $window.assassin = null;
	        deferred.reject(res);
	      });

	    // return promise object
	    return deferred.promise;
	};

	function currentAssassin() {
		
		// create a new instance of deferred
	    var deferred = $q.defer();

	    // send a get request to the server
	    $http.get('/api/assassin')
	      // handle success
	      .success(function (res, status) {

	        if(status === 200 && res.data){
	        	
	          $window.assassin = res.data;
	          deferred.resolve();
	        } else {
	          $window.assassin = null;
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        $window.assassin = null;
	        deferred.reject();
	      });

	    // return promise object
	    return deferred.promise;
	};

	function logout() {

	    // create a new instance of deferred
	    var deferred = $q.defer();

	    // send a get request to the server
	    $http.get('/api/assassin/logout')
	      // handle success
	      .success(function (res) {
	        $window.admin = null;
	        deferred.resolve();
	      })
	      // handle error
	      .error(function (res) {
	        $window.admin = null;
	        deferred.reject();
	      });

	    // return promise object
	    return deferred.promise;
	}
	
});

app.factory("DeathService", function($q, $timeout, $http, $window) {

    //return available functions for use in controllers
	return ({
		killedTarget: killedTarget,
		died: died,
		revokeKill: revokeKill
	})

	// create a new instance of deferred
	

	function killedTarget() {
		var deferred = $q.defer();

		$http.post("/api/death/killed")
	      // handle success
	      .success(function (res, status) {
	        if(status === 200 && res){
	          deferred.resolve(res);
	        } else {
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        deferred.reject(res);
	      });

	    // return promise object
	    return deferred.promise;
	}

	function died() {
		var deferred = $q.defer();
		
		$http.post("/api/death/died")
	      // handle success
	      .success(function (res, status) {
	        if(status === 200 && res.data){
	          deferred.resolve();
	        } else {
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        deferred.reject(res);
	      });

	    // return promise object
	    return deferred.promise;
	}

	function revokeKill() {
		var deferred = $q.defer();
		
		$http.post("/api/death/revoke")
	      // handle success
	      .success(function (res, status) {
	      	console.log(res);
	        if(status === 200 && res){
	          deferred.resolve(res.data);
	        } else {
	          deferred.reject();
	        }
	      })
	      // handle error
	      .error(function (res) {
	        deferred.reject(res);
	      });

	    // return promise object
	    return deferred.promise;
	}


});