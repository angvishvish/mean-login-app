meanLoginApp.factory('postService', function ($resource) {
  
  return $resource('/api/posts');
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