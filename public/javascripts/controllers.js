var app = angular.module('myApp.controllers', []);

app.filter('reverse', function() {
  return function(items) {
    if(items) {
      return items.slice().reverse();  
    }
  };
});


//make mainCtrl
app.controller('mainCtrl',
  ['$scope', '$location', 'AuthService', '$window', '$http', '$rootScope', 'AssassinAuthService',
  function ($scope, $location, AuthService, $window, $http, $rootScope, AssassinAuthService) {

    $rootScope.adminLoggedIn = AuthService.isLoggedIn();

    $rootScope.assassinLoggedIn = AssassinAuthService.isAssassinLoggedIn();

    $rootScope.assassin = {};

    $rootScope.admin = {};



    //current admin
    AuthService.currentAdmin()
    .then(function() {
      //set admin
      $scope.adminLoggedIn = true;
      $rootScope.admin = $window.admin;
      console.log("Admin is logged in");
      })
    .catch(function() {
      console.log("No admin is logged in");
    });

    //current assassin
    AssassinAuthService.currentAssassin()
    .then(function() {
      //set assassin
      $rootScope.assassinLoggedIn = true;
      $rootScope.assassin = $window.assassin;
      getGame();
      console.log("Assassin is logged in");
      })
    .catch(function() {
      console.log("No assassin is logged in");
    });

    $scope.searchInfo = {};

    //search error initial value
    $scope.searchError = false;

    $scope.search = function() {
      $http.post('/api/game-search', $scope.searchInfo)
      .success(function (res, status) {
        if(status === 200 && res.data) {
          $scope.searchInfo = {};
          var game = res.data;
          $location.path("/game/" + game.title + "/login");
        }
      })
      .error(function(res) {
        console.log('Cant find that game');
        $scope.searchInfo = {};
        $scope.searchErrorMessage = "Game with that title does not exist";
        $scope.searchError = true;
      });
    }


    function getGame(){
      $http.get('/api/assassin/game/' + $window.assassin.game)
        // handle success
        .success(function (res, status) {
          if(status === 200 && res.data){
            $rootScope.game = res.data;
            console.log("rootScopegame", $rootScope.game);
          }
        })
          // handle error
        .error(function (res) {
          console.log(err);
          $location.path('/');
        });
    }
    



    $scope.$on("admin logout", function(event, data) {
      // console.log(event);
      // console.log(data);
      $scope.adminLoggedIn = false;
    })

    $scope.$on("admin login", function(event, data) {
      $scope.adminLoggedIn = true;
    })

    $scope.$on("assassin logout", function(event, data) {
      $scope.assassinLoggedIn = false;
    })

    $scope.$on("assassin login", function(event, data) {
      // getGame();
      $scope.assassinLoggedIn = true;
    })

    $scope.$on("assassin register", function(event, data) {
      getGame();
      $scope.assassinLoggedIn = true;
    })

    
}]);

// CONTROLLERS

// Admin Controllers
app.controller('adminRegisterCtrl',
  ['$scope', '$location', 'AuthService', '$rootScope', '$window',
  function ($scope, $location, AuthService, $rootScope, $window) {
  	$scope.newAdmin = {};

    //initial value
    $scope.error = false

  	$scope.register = function() {
  		AuthService.register($scope.newAdmin)
      .then(function() {
        $rootScope.$broadcast("admin login");
        $rootScope.admin = $window.admin;
        $location.path('/admin/' + $window.admin.username + "/home");
      })
      .catch(function() {
        $scope.error = true;
        $scope.errorMessage = "Someone has already taken that email or username. Please try again.";
        $scope.newAdmin.password = null;
      })
  	};
}]);

app.controller('adminLoginCtrl',['$scope','$rootScope', '$location', 'AuthService', '$window',
 function ($scope, $rootScope, $location, AuthService, $window) {
    $scope.loginForm = {};

    $scope.login = function () {
      //initial value
      $scope.error = false;

      //call login from service
      AuthService.adminLogin($scope.loginForm)
      // handle success
      .then(function() {
        $rootScope.$broadcast("admin login");
        $rootScope.admin = $window.admin;
        $location.path('/admin/' + $window.admin.username + "/home");
        $scope.loginForm = {};
      })
      // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.loginForm.password = null;
      })
    }; 
}]);

app.controller('logoutCtrl', ['$scope', '$location', 'AuthService', '$window', '$rootScope', 'AssassinAuthService',
 function ($scope, $location, AuthService, $window, $rootScope, AssassinAuthService) {

    $scope.adminLogout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $rootScope.$broadcast('admin logout');
          $window.location.href = "/"
        });

    };

    $scope.assassinLogout = function () {
      // call logout from service
      AssassinAuthService.logout()
        .then(function () {
          $rootScope.$broadcast('assassin logout');
          $window.location.href = "/"
        });

    };

}]);

app.controller('adminHomeCtrl',['$scope','$rootScope', '$location', 'AdminGamesService', '$window', '$routeParams',
 function ($scope, $rootScope, $location, AdminGamesService, $window, $routeParams) {
  
    $scope.admin = $window.admin;

    $scope.show = true; 

    $scope.showDetails = false;

    $scope.viewDetails = function() {
      $scope.showDetails = true;
    }

    if($scope.admin === null) {
      $location.path('/admin/login');
    } else {
      //check if window admin exists so username var
      //doesn't throw an error
      if($window.admin) {
        //get the username of the current admin
        var username = $window.admin.username;

        //redirect to admins home if they try to go to
        //another admin's home page
        if(username !== $routeParams.username) {
          $location.path('/admin/' + username + "/home");
        }
      }
    }

    //get games that admin is a part of
    AdminGamesService.get({admin: $scope.admin._id},
     function(res) {
      $scope.games = res.data;
     },
     function(res) {
      $location.path('/admin/login');
      console.log(res);
     });


}]);


// Game controllers
app.controller('gameCreateCtrl',['$scope','$rootScope', '$location', 'GameService', '$window',
 function ($scope, $rootScope, $location, GameService, $window) {
    if($window.admin) {
      $scope.gameForm = {};

      $scope.error = false;

      $scope.createGame = function() {

        GameService.save($scope.gameForm, 
          function(data) {
            console.log("GAME CREATION SUCCESSS");
            $location.path("/admin/" + $window.admin.username + "/home");
          },
          function(data) {
            console.log("GAME CREATION ERROR");
            $scope.errorMessage = "A game with that Title has already been made."
            $scope.error = true;
          })
      }

    } else {
      $location.path('/admin/login');
    }
}]);


// Assassin controllers
app.controller('assassinGameRegisterCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    $scope.assassinRegister = {};

    $scope.gameTitle = $routeParams.title;

    $scope.register = function() {
      if(!!$("#real_photo").val() && !!$("#game_icon").val()) {
          $scope.assassinRegister.real_photo = $("#real_photo").val();
          $scope.assassinRegister.avatar = $("#game_icon").val();
            AssassinAuthService.gameRegister($scope.assassinRegister, $scope.gameTitle)
            .then(function() {
              $rootScope.assassinLoggedIn = AssassinAuthService.isAssassinLoggedIn();
              $location.path('/game/' + $scope.gameTitle + "/home");
              $scope.$emit("assassin register");
            })
            .catch(function(response) {
              $scope.error = true;
              $scope.errorMessage = response.err;
              if(response.cause === "key") {
                $scope.assassinRegister.key = null;
              } else {
                console.log(response.cause);
                $scope.assassinRegister.password = null;
                $scope.assassinRegister.codename = null;
              }
            })
      } else {
          $scope.error = true;
          $scope.errorMessage = "Please upload images for your Game Avatar and also an image of yourself.";
      }
    }
}]);

app.controller('assassinRegisterCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    $scope.assassinRegister = {};

    var gameTitle = $scope.assassinRegister.title;

    
      $scope.register = function() {
        if(!!$("#real_photo").val() && !!$("#game_icon").val()) {
          $scope.assassinRegister.real_photo = $("#real_photo").val();
          $scope.assassinRegister.avatar = $("#game_icon").val();
          console.log($scope.assassinRegister);
          AssassinAuthService.register($scope.assassinRegister)
          .then(function() {
            $rootScope.assassinLoggedIn = AssassinAuthService.isAssassinLoggedIn();
            $rootScope.assassin = $window.assassin;
            $scope.$emit("assassin register");
            $location.path('/game/' + $scope.assassinRegister.title + "/home");
          })
          .catch(function(response) {
            $scope.error = true;
            $scope.errorMessage = response.err;

            if(response.cause === "key") {
              $scope.assassinRegister.key = null;
            } else {
              console.log(response.cause);
              $scope.assassinRegister.password = null;
              $scope.assassinRegister.codename = null;
            }
          })
        } else {
          $scope.error = true;
          $scope.errorMessage = "Please upload images for your Game Avatar and also an image of yourself.";
        }
      }
}]);

app.controller('assassinGameLoginCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    $scope.assassinLogin = {};

    $scope.gameTitle = $routeParams.title;

    $scope.assassinLogin.title = $scope.gameTitle;

    $scope.login = function() {
      
      AssassinAuthService.assassinGameLogin($scope.assassinLogin)
      .then(function() {
        $rootScope.assassinLoggedIn = AssassinAuthService.isAssassinLoggedIn();
        $rootScope.assassin = $window.assassin;
        console.log("GAME LOGIN", $rootScope.assassinLoggedIn);
        $scope.$emit("assassin login");
        $location.path('/game/' + $scope.gameTitle + "/home");
      })
      .catch(function(response) {
          $scope.errorMessage = response.err;
          $scope.error = true;

          if(response.cause === "codename") {
            $scope.assassinLogin.codename = null;
          } else {
            $scope.assassinLogin.password = null;
          }
      })
    }
}]);

app.controller('assassinLoginCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    $scope.assassinLogin = {};

    $scope.game = {};

    $scope.login = function() {
      
      AssassinAuthService.assassinLogin($scope.assassinLogin)
      .then(function() {
        $location.path('/game/' + $scope.assassinLogin.title + "/home");
        $scope.$emit("assassin login");
        $rootScope.assassinLoggedIn = AssassinAuthService.isAssassinLoggedIn();
        $rootScope.assassin = $window.assassin;
        console.log("REG LOGIN", $rootScope.assassinLoggedIn);
      })
      .catch(function(response) {
        console.log(response);
          $scope.errorMessage = response.err;
          $scope.error = true;

          if(response.cause === "codename") {
            $scope.assassinLogin.codename = null;
            $scope.assassinLogin.password = null;
          } else if (response.cause === "password") {
            $scope.assassinLogin.password = null;
          } else if (response.cause === "game") {
            $scope.assassinLogin.title = null;
          } else if(response.cause === "no match") {
            $scope.assassinLogin.codename = null;
            $scope.assassinLogin.password = null;
          }
      })
    }
}]);

app.controller('gameMainCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams', 'GameService', '$http',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams, GameService, $http) {
  
  if($window.assassin === null && $window.admin === null) {
        $location.path("/");
    }

  if ($window.admin) {
    GameService.findGameAdmin()
    .then(function(response) {
      $scope.game = response.data.data;
      $rootScope.game = $scope.game;
      console.log(response.data.data);
    })
    .catch(function(response) {
      $location.path('/');
    })
  }

  if($window.assassin) {
    GameService.findGameAssassin()
    .then(function(response) {
      $scope.game = response.data.data;
      $rootScope.game = $scope.game;
    })
    .catch(function(response) {
      $location.path('/');
    })
    // $rootScope.isAlive = $window.assassin.is_alive;
  } 


  


  

}]);

app.controller('gameHomeCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    
 
}]);

app.controller('gameAdminCtrl',['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams) {


    if($window.admin === null) {
      $location.path("/admin/login");
    }

    $scope.admin = $window.admin;

    $scope.gameStarted = true; 
    //get games that admin is a part of
    GameService.resource().get({data: $routeParams.title},
     function(res) {
      console.log(res);
      // console.log(werwerew);
      $scope.game = res.data;
      // $scope.$broadcast("gameRetrieved", $scope.game);
      $scope.gameStarted = $scope.game.game_started;
     },
     function(res) {
      $location.path('/');
      console.log(res);
     });
 
}]);



app.controller('gamePlayersCtrl',['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http) {

    $scope.$on("shuffledTargets", function(event, data) {
      $scope.players = data;
    })

    var playersForProfile;
    var playersForHome;

    if($routeParams.assassin !== undefined) {
      playersForProfile = true;
    }

    if($routeParams.title !== undefined) {
      playersForHome = true;
    }


    if(playersForHome) {
      console.log("GOT PLAYERS");
      $http.get('/api/' + $routeParams.title + '/assassins')
        .success(function (res, status) {
          if(status === 200 && res.data) {
            console.log("got players succesfully");
            console.log(res.data);
            $scope.players = res.data;
            $scope.$emit("playersLoaded");
          }
        })
        .error(function(res) {
          $scope.players = [];
          console.log('Cant find that game');
          $location.path("/");
        });
    }

    if(playersForProfile) {
      console.log(playersForProfile);
      console.log("request for players made");
      $http.get('/api/' + $window.assassin.game + '/assassins')
        .success(function (res, status) {
          if(status === 200 && res.data) {
            $scope.players = res.data;
            console.log(res.data);
          }
        })
        .error(function(res) {
          console.log('Cant find that game');
          $location.path("/");
        });
    }

    $scope.sayTagline = function(id) {
      $("#" + id + "-tagline").fadeIn("fast");
      
    }

    $scope.removeTagline = function(id) {
      $("#" + id + "-tagline").fadeOut("fast");
      $scope.addMark(id);
    }

    $scope.removeMark = function(id) {
      console.log("remove");
      $("#" + id + "-hitmark").fadeOut("fast");
    }
   
    $scope.addMark = function(id) {
      console.log('ran');
      console.log(id);
      $("#" + id + "-hitmark").fadeIn("fast");  
    }
    

}]);


app.controller('assignTargetsCtrl',['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http) {

    $scope.shuffleTargets = function() {
      $http.get('/api/' + $routeParams.title + '/assignTargets')
        .success(function (res, status) {
          if(status === 200 && res.data) {
            $scope.player = res.data;
            $rootScope.$broadcast("shuffledTargets", $scope.player);
          }
        })
        .error(function(res) {
          console.log('Cant find that game');
          $location.path("/");
        });
    }

    $scope.startGame = function() {
      var start = confirm("Are you sure you want start the game? Assassins can no longer join once you start the game.");
      $scope.gameData.game_started_on = new Date;

      if(start) {
        $http.post('/api/' + $routeParams.title + '/start', $scope.gameData)
           .success(function (res, status) {
              if(status === 200 && res.data) {
                $scope.player = res.data;
              }
            })
          .error(function(res) {
            console.log('Cant find that game');
            $location.path("/");
          });
      }
    }


}]);

app.controller('assassinProfileCtrl',['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http) {

    var assassinProfile = $routeParams.assassin;
    if($window.assassin === null) {
      $location.path("/assassin/login");
    }
    else if($window.assassin.codename !== assassinProfile) {
      $location.path("/assassin/" + $window.assassin.codename + "/profile");
    }

}]);

app.controller('assassinTargetCtrl',['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http) {

     var assassinId = $window.assassin.target;
     var assassinGame = $window.assassin.game;

     $scope.$on("found assassin game", function() {
        if($rootScope.game && $rootScope.game.game_started) {
         $http.get('/api/' + assassinGame + "/" + assassinId + '/target')
            .success(function (res, status) {
              if(status === 200 && res.data) {
                $scope.target = res.data;
              }
            })
            .error(function(res) {
              console.log('Cant find that target');
              $location.path("/");
            });
        }

     });

    

}]);

app.controller('killedTargetCtrl', ['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http', 'DeathService',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http, DeathService) {

      $scope.$on("revoked kill", function() {
        $scope.reportSuccessful = false;
        $scope.error = false;
      })

      $scope.killedTarget = function() {
        console.log("tried to kill target");
        DeathService.killedTarget()
        .then(function(response) {
          console.log("report successful");
          $scope.reportSuccessful = true;
          $scope.successMessage = "Target kill reported. Waiting on target confirmation."
          $rootScope.assassin = response.data;
          $rootScope.$broadcast("killed target");
        })
        .catch(function(response) {
           console.log("report not successful");
            $scope.error = true;
            $scope.errorMessage = response.err;
        })
      }

}]);

app.controller('diedCtrl', ['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http', 'DeathService',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http, DeathService) {

      $scope.nearDeath = ($window.assassin.deathPoints === 1);

      console.log($scope.nearDeath);

      $scope.died = function() {
          if($scope.nearDeath) {
            DeathService.died()
          .then(function() {
            $scope.reportSuccessful = true;
            $scope.successMessage = "Your death has been confirmed. You have been eliminated from the game."
          })
          .catch(function(response) {
             console.log("report not successful", response);
              $scope.error = true;
              $scope.errorMessage = response.err;
          })
        }
      }

}]);

app.controller('revokeKillCtrl', ['$scope','$rootScope', '$location', '$window', 'GameService', '$routeParams', '$http', 'DeathService',
 function ($scope, $rootScope, $location, $window, GameService, $routeParams, $http, DeathService) {

      $scope.$on("killed target", function() {
        $scope.canRevoke = ($rootScope.assassin.kill_reports > $rootScope.assassin.kills.length);
      });

      $scope.canRevoke = ($rootScope.assassin.kill_reports > $rootScope.assassin.kills.length);

      $scope.revokeKill = function() {
        DeathService.revokeKill()
        .then(function(response) {
            $rootScope.assassin = response;
            $scope.canRevoke = ($rootScope.assassin.kill_reports > $rootScope.assassin.kills.length);
            $rootScope.$broadcast("revoked kill");
          })
          .catch(function(response) {
             console.log("report not successful", response);
             
          })
      }
}]);

app.directive







