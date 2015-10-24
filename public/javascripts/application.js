var app = angular.module('myApp', ['ngResource',
                                   'ngRoute', 'myApp.controllers', 'myApp.services'
                                   ]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/templates/welcome-index.html'
      })
      .when('/admin_signup', {
        templateUrl: '/static/templates/admin-signup.html',
        controller: 'adminRegisterController'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);

console.log("application.js!");