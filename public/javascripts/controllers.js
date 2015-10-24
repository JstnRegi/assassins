var app = angular.module('myApp.controllers', []);

//make mainCtrl
app.controller('mainCtrl',
  ['$scope', '$location', 'AuthService', '$window',
  function ($scope, $location, AuthService, $window) {



    AuthService.currentAdmin()
    .then(function() {
      //set admin
      $scope.adminLoggedIn = true;
      $scope.admin = $window.admin;
      console.log("someone is logged in");
      })
    .catch(function() {
      console.log("no one is logged in");
    });

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



