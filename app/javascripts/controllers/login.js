meanLoginApp
.controller('loginController',

  function ($scope, $http, $rootScope, $location) {
    
    $scope.loginUser = function () {
      $scope.user = {
        username: $scope.username,
        password: $scope.password
      }

      $http.post('/auth/login', $scope.user).success( function (data) {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        
        // now go to main page
        $location.path('/');
      })
      .error(function (err) {
        console.log('Unable to connect', err);
      });
    } 
  }
);
