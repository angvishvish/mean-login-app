meanLoginApp
.controller('loginController',

  function ($scope, $http, $rootscope, $location) {
    
    $http.post('/auth/login', $scope.user).success( function (data) {
      $rootScope.authenticate = true;
      $rootScope.current_user = data.user.username;

      // now go to main page
      $location.path('/');
    })
    .error(function (err) {
      console.log('Unable to connect', err);
    });
  }
);
