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
        $rootScope.authenticate = true;
        $rootScope.current_user = data.user.username;
        console.log(data);
        // now go to main page
        // $location.path('/');
      })
      .error(function (err) {
        console.log('Unable to connect', err);
      });
    }      
  }
);
