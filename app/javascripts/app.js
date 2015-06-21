
var meanLoginApp = angular.module('meanLoginApp', [
  'ngRoute',
  'ngResource'
]).run(function ($rootScope, $http) {
  $rootScope.authenticated  = false;
  $rootScope.current_user   = '';

  $rootScope.logoutUser = function () {

    $http.get('/auth/signout');

    // nullfy the rootscope
    $rootScope.authenticated  = false;
    $rootScope.current_user   = '';
  }
});

meanLoginApp.config(function ($routeProvider) {
  $routeProvider

    // when in the home page 
    .when('/', {
      templateUrl: 'post.html',
      controller: 'postController'
    })

    // when in the login page
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'loginController'
    })

    // when in the signup page
    .when('/register', {
      templateUrl: 'signup.html',
      controller: 'authController'
    });
});
