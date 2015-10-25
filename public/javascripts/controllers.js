var app = angular.module('myApp.controllers', []);

//make mainCtrl
app.controller('mainCtrl',
  ['$scope', '$location', 'AuthService', '$window', '$http', '$rootScope', 'AssassinAuthService',
  function ($scope, $location, AuthService, $window, $http, $rootScope, AssassinAuthService) {

    //current admin
    AuthService.currentAdmin()
    .then(function() {
      //set admin
      $scope.adminLoggedIn = true;
      $scope.admin = $window.admin;
      console.log("Admin is logged in");
      })
    .catch(function() {
      console.log("No admin is logged in");
    });

    //current assassin
    AssassinAuthService.currentAssassin()
    .then(function() {
      //set assassin
      $scope.assassinLoggedIn = true;
      $scope.assassin = $window.assasin;
      console.log("Assassin is logged in");
      })
    .catch(function() {
      console.log("No assassin is logged in");
    });

    $scope.searchInfo = {};

    //search error initial value
    $scope.searchError = false;

    $scope.search = function() {
      $http.post('/api/game', $scope.searchInfo)
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

    $scope.$on("admin logout", function(event, data) {
      // console.log(event);
      // console.log(data);
      $scope.adminLoggedIn = false;
    })

    $scope.$on("admin login", function(event, data) {
      $scope.adminLoggedIn = true;
    })

    
}]);

// CONTROLLERS

// AUTH CONTROLLERS 
app.controller('adminRegisterCtrl',
  ['$scope', '$location', 'AuthService', '$rootScope',
  function ($scope, $location, AuthService, $rootScope) {
  	$scope.newAdmin = {};

    //initial value
    $scope.error = false

  	$scope.register = function() {
  		AuthService.register($scope.newAdmin)
      .then(function() {
        $rootScope.$broadcast("admin login");
        $location.path('/new_game')
      })
      .catch(function() {
        $scope.error = true;
        $scope.errorMessage = "Someone has already taken that email or username. Please try again.";
        $scope.newAdmin.password = null;
      })
  	};
}]);

app.controller('adminLoginCtrl',['$scope','$rootScope', '$location', 'AuthService',
 function ($scope, $rootScope, $location, AuthService) {
    $scope.loginForm = {};

    $scope.login = function () {
      //initial value
      $scope.error = false;

      //call login from service
      AuthService.adminLogin($scope.loginForm)
      // handle success
      .then(function() {
        $rootScope.$broadcast("admin login");
        $location.path('/');
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

app.controller('logoutCtrl', ['$scope', '$location', 'AuthService', '$window', '$rootScope', function ($scope, $location, AuthService, $window, $rootScope) {

    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $rootScope.$broadcast('admin logout');
          $location.path('/');
        });

    };

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
            $location.path("/admin/home");
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
app.controller('assassinRegisterCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    $scope.assassinRegister = {};

    var gameTitle = $routeParams.title;

    $scope.register = function() {
      AssassinAuthService.register($scope.assassinRegister, gameTitle)
      .then(function() {
        $location.path('/game/' + $routeParams.title + "/home");
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
    }
}]);

app.controller('assassinLoginCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    $scope.assassinLogin = {};

    var gameTitle = $routeParams.title;

    $scope.login = function() {
      
      AssassinAuthService.assassinLogin($scope.assassinLogin)
      .then(function() {
        $location.path('/game/' + $routeParams.title + "/home");
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

app.controller('gameHomeCtrl',['$scope','$rootScope', '$location', '$window', 'AssassinAuthService', '$routeParams',
 function ($scope, $rootScope, $location, $window, AssassinAuthService, $routeParams) {
  
    if($window.assassin === null) {
      $location.path('/game/' + $routeParams.title + "/login");
    }
    
    
}]);




