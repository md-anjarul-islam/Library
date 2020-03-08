app.controller("indexController", function($scope, $rootScope, $http) {


    (function() {
    $http({
      method: "GET",
      url: "books"
    })
      .then(response => {
        if (response.data.length == 0) $scope.message = "No book found!";
        else $scope.books = response.data;
      })
      .catch(err => {
        $scope.message = err;
      });
  })();

  $scope.login = function() {
    let user = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: "POST",
      url: "/login",
      data: JSON.stringify(user)
    })
      .then(response => {
        let userInfo = response.data;
        $rootScope.link2 = `#!/profile`;
        $rootScope.link3 = "#!/dashboard";
        $rootScope.link4 = "#!/logout";
    
        $rootScope.linkName2 = userInfo.fullname;
        $rootScope.linkName3 = "Dashboard";
        $rootScope.linkName4 = "Log Out";
      })
      .catch(err => {
        $scope.userInfo = err.data.message;
      });
  };

  $scope.register = function() {
    if ($scope.password !== $scope.confirmpass)
      $scope.message = "Please insert password correctly";
    else {
      let user = {
        username: $scope.username,
        fullname: $scope.fullname,
        email: $scope.email,
        password: $scope.password
      };
      $http({
        method: "POST",
        url: "/register",
        data: JSON.stringify(user)
      })
        .then(response => {
            let userInfo = response.data;
            $rootScope.link2 = `#!/profile`;
            $rootScope.link3 = "#!/dashboard";
            $rootScope.link4 = "#!/logout";
        
            $rootScope.linkName2 = userInfo.fullname;
            $rootScope.linkName3 = "Dashboard";
            $rootScope.linkName4 = "Log Out";
        })
        .catch(err => {
          $scope.message = err.data.message;
        });
    }
  };
});
