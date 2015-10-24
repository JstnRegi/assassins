var app = angular.module('myApp.controllers', []);

//make mainCtrl
app.controller('mainCtrl',
  ['$scope', '$location', 'AuthService', '$window',
  function ($scope, $location, AuthService, $window) {

    

    AuthService.currentAdmin()
    .then(function() {
      //set admin
      $scope.admin = $window.admin;
      console.log("someone is logged in");
      })
    .catch(function() {
      console.log("no one is logged in");
    });

    
}]);

// CONTROLLERS

// AUTH CONTROLLERS 
app.controller('adminRegisterCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
  	$scope.newAdmin = {};

    //initial value
    $scope.error = false

  	$scope.register = function() {
  		AuthService.register($scope.newAdmin)
      .then(function() {
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

app.controller('logoutCtrl', ['$scope', '$location', 'AuthService', '$window', function ($scope, $location, AuthService, $window) {

    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $window.location.href = '/';
        });

    };

}]);



