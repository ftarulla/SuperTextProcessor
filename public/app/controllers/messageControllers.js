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

    // modifyMessage()
    $scope.modifyMessage = function(id) {
      $location.path("/messages/modify/" + id);
    }

    // deleteMessage()
    $scope.deleteMessage = function(id) {

      MessageService.delete(id)
        .success(function(data) {
          var returnedId = parseInt(data.deletedId);
          var i=0;
          while(i<$scope.messages.length && $scope.messages[i].id != returnedId) {
            i++;
          }
          if(i<$scope.messages.length) {
            $scope.messages.splice(i, 1);
          }
        })
        .error(function(err){
          console.log("Error eliminando message " + id + "." + err);
        })
    }
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

messageControllers.controller('messageCreateCtrl', [
  '$scope',
  '$location',
  'MessageService',

  function($scope, $location, MessageService) {
    console.log("messageControllers::messageCreateCtrl");

    // saveMessage()
    $scope.saveMessage = function() {

      MessageService.create($scope.newText)
        .success(function(data) {
          $scope.message = data;
          $location.path("/");
        })
        .error(function(err){
          console.log("Error: " + err);
        });

    };

  }
]);

messageControllers.controller('messageModifyCtrl', [
  '$scope',
  '$location',
  '$routeParams',
  'MessageService',

  function($scope, $location, $routeParams, MessageService) {
    console.log("messageControllers::messageModifyCtrl");

    // init
    MessageService.get($routeParams.id)
      .success(function(data) {
        $scope.newText = data.text;
      })
      .error(function(err){
        console.log("Error: " + err);
      });

    // saveMessage()
    $scope.saveMessage = function() {

      MessageService.update($routeParams.id, $scope.newText)
        .success(function(data) {
          $location.path("/");
        })
        .error(function(err){
          console.log("Error: " + err);
        });

    };

  }
]);