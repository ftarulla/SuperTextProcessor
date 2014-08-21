var messageControllers = angular.module('messageControllers', []);

messageControllers.controller('messageListCtrl', [
  '$scope', 
  '$location', 
  '$window', 
  'MessageService', 

  function($scope, $location, $window, MessageService) {
    console.log("messageControllers::messageListCtrl");
    
    MessageService.list()
      .success(function(data) {
        $scope.messages = data;
      })
      .error(function(err){
        console.log("Error: " + err);
      });
  }
]);

messageControllers.controller('messageDetailCtrl', [
  '$scope',
  '$routeParams',
  'MessageService',

  function($scope, $routeParams, MessageService) {
    console.log("messageControllers::messageDetailCtrl");
    
    MessageService.get($routeParams.id)
      .success(function(data) {
        $scope.message = data;
      })
      .error(function(err){
        console.log("Error: " + err);
      });
  }
]);