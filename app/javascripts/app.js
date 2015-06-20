var meanLoginApp = angular.module('meanLoginApp', [
  'ngRoute',
  'ngResource'
])
.run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  
  $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = '';
  };
});


meanLoginApp
.config(function ($routeProvider) {
  $routeProvider

    // when in the home page 
    .when('/', {
      templateUrl: 'index.html',
      controller: 'postController'
    })

    // when in the login page
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })

    // when in the signup page
    .when('/register', {
      templateUrl: 'signup.html',
      controller: 'authController'
    });
});