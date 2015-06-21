// meanLoginApp.factory('userService', function ($http, $resource) {
//   var userLogin = {};

//   userLogin.getUserLogin = function (userObj) {
//     return $http.post('/auth/login', userObj);
//   }
//   return userLogin;
// });

meanLoginApp
.controller('loginController',

  function ($scope, $http, $rootScope, $location) {
    
    $scope.error_msg = '';

    $scope.loginUser = function () {
      $scope.user = {
        username: $scope.username,
        password: $scope.password
      }

      $http.post('/auth/login', $scope.user).success( function (data) {
        if(data.state == 'success'){
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          
          // now go to main page
          $location.path('/');
        } else {
          $scope.error_msg = data.message;
        }
      })
      .error(function (err) {
        console.log('Unable to connect');
      });
    } 
  }
);
