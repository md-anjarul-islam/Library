const app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            redirectTo: '/',
            controller: 'indexController'
        })
        .when('/login', {
            templateUrl: "/views/login.html",
            controller: 'indexController'
        })
        .when('/register', {
            templateUrl: "/views/register.html",
            controller: 'indexController'
        })
        .when('/books', {
            templateUrl: "/views/allbook.html",
            controller: 'bookController'
        })
})
