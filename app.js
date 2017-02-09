'use strict';

var app = angular.module('myApp', [
  'ngResource'
]);

app.factory('loader', function($resource) {
  var apiloader = function() {
    this.loading = false;
  };
  apiloader.prototype.searchItem = function() {
    this.loading = true;
    return $resource('http://api.walmartlabs.com/v1/search?apiKey=mvwyfxq9tjg8tntp8xp5jwtu&query=:query');
  };
  return apiloader;
});

app.controller('searchItemController', function($scope, loader, $resource){
  $scope.loader = new loader();
  $scope.status = 'Loading...';
  $scope.keyword = 'ipod';
  $scope.result = {items:[]};
  $scope.sorting = 'itemId';
  $scope.showOnly = {availableOnline:''};
  $scope.itemsearch = function() {
    $scope.loader.searchItem().get({query:$scope.keyword}, function(result){
      $scope.loader.loading = false;
      $scope.result = result;
    });;
  };
});
