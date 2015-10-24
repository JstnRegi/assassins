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
        controller: 'adminRegisterCtrl'
      })
      .when('/admin/login', {
        templateUrl: '/static/templates/admin-login.html',
        controller: 'adminLoginCtrl'
      })
      .when('/game/new', {
        templateUrl: "/static/templates/game-new.html",
        controller: 'gameCreateCtrl'
      })
      .when('/admin/home', {
        template: "Admin home says hello"
      })
      .when('/game/:title/register', {
        template: "Game register says hello!"
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);

