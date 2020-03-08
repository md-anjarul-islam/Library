app.controller("bookController", function($scope, $http) {
  $scope.getBooks = function() {
    $http({
      method: "GET",
      url: "/books"
    }).then(response => {
      $scope.books = response.data;
    });
  };

  $scope.getBook = function(bookId) {
    $http({
      method: "GET",
      url: "/books/bookId"
    }).then(response => {
      $scope.book = response.data;
    });
  };
});

app.directive("bookDirective", function() {
  return {
    template: `<div ng-include="'/views/allbook.html'"> <div>`
  };
});
