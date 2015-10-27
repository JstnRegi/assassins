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
      .when('/admin/:username/home', {
        templateUrl: "/static/templates/admin-home.html"
      })
      .when('/game/new', {
        templateUrl: "/static/templates/game-new.html",
        controller: 'gameCreateCtrl'
      })
      .when('/game/:title/register', {
        templateUrl: "/static/templates/assassin-game-signup.html",
        controller: 'assassinRegisterCtrl'
      })
      .when('/game/:title/home', {
        templateUrl: "/static/templates/game-home.html"
      })
      .when('/game/:title/login', {
        templateUrl: "/static/templates/assassin-game-login.html",
        controller: "assassinGameLoginCtrl"
      })
      .when('/game/:title/admin-page', {
        templateUrl: "/static/templates/game-admin.html"
      })
      .when('/assassin/login', {
        templateUrl: "/static/templates/assassin-login.html",
        controller: 'assassinLoginCtrl'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);

