var app = angular.module('myApp.controllers', []);

//make mainCtrl

// CONTROLLERS
app.controller('adminRegisterController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
  	$scope.newAdmin = {};

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