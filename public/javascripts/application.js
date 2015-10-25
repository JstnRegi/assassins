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
      .when('/admin/home', {
        templateUrl: 'Admin home page says hello!'
      })
      .when('/game/new', {
        templateUrl: "/static/templates/game-new.html",
        controller: 'gameCreateCtrl'
      })
      .when('/admin/home', {
        template: "Admin home says hello"
      })
      .when('/game/:title/register', {
        templateUrl: "/static/templates/assassin-signup.html",
        controller: 'assassinRegisterCtrl'
      })
      .when('/game/:title/home', {
        templateUrl: "/static/templates/game-home.html"
      })
      .when('/game/:title/login', {
        templateUrl: "/static/templates/assassin-login.html",
        controller: "assassinLoginCtrl"
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);

