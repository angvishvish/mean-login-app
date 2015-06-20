
var meanLoginApp = angular.module('meanLoginApp', [
  'ngRoute'
]).run(function ($rootScope) {
  $rootScope.authenticated  = false;
  $rootScope.current_user   = '';
});
// .run(function($rootScope) {
//   $rootScope.authenticated = false;
//   $rootScope.current_user = '';
  
//   $rootScope.signout = function(){
//       $http.get('auth/signout');
//       $rootScope.authenticated = false;
//       $rootScope.current_user = '';
//   };
// });


meanLoginApp
.config(function ($routeProvider) {
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

meanLoginApp
.controller('postController',

  function ($scope, $rootScope) {

    $scope.posts = [];

    $scope.newPost = {
      id: '',
      created_at: '',
      created_by: '',
      text: '',
      completed: false
    };
    
    $scope.sendTweet = function () {

      $scope.newPost.created_at = Date.now();
      $scope.newPost.created_by = $rootScope.current_user;

      $scope.posts.push($scope.newPost);

      $scope.newPost = {
        text: ''
      };
    };

    $scope.deleteTweet = function (index) {
      $scope.posts.splice(index, 1);
    };
  
  }
);
