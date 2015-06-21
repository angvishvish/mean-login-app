meanLoginApp
.controller('authController',

  function ($scope, $http, $rootScope, $location) {
    $scope.username = '';
    $scope.password = '';

    $scope.registerUser = function () {
      $scope.user = {
        username: $scope.username,
        password: $scope.password
      }

      $http.post('/auth/signup', $scope.user).success( function (data) {
        console.log(data);
        
        // now go to login page
        $location.path('/login');
      })
      .error(function (err) {
        console.log('Unable to connect');
      });
    }
  }
);
