
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

meanLoginApp.factory('postService', function ($resource) {
  
  return $resource('/api/posts');
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

meanLoginApp.controller('postController',

  function ($scope, $rootScope, postService) {

    $scope.posts = postService.query();

    $scope.newPost = {
      id: '',
      created_at: '',
      created_by: '',
      text: '',
      completed: false
    };
    
    $scope.sendTweet = function () {

      if (!$scope.newPost.text)
        return;

      $scope.newPost.created_at = Date.now();
      $scope.newPost.created_by = $rootScope.current_user;
      $scope.archived           = false;

      postService.save($scope.newPost, function () {
        $scope.posts = postService.query();
        $scope.newPost = {
          text: ''
        };
      });
      
    };

    $scope.deleteTweet = function (index) {
      $scope.posts.splice(index, 1);
      postService.delete($scope.posts, function () {
        console.log($scope.posts);
      });
    };
  
  }
);
