var messageControllers = angular.module('messageControllers', []);

messageControllers.controller('messageListCtrl', ['$scope', '$location', '$window', 'MessageService', 
  function($scope, $location, $window, MessageService) {
    console.log("messageControllers::messageListCtrl");
    
    MessageService.list()
      .success(function(data) {
        $scope.messages = data;
      })
      .error(function(err){
        console.log("Error: " + err);
      });   
}]);