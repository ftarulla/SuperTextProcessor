'use strict';

angular.module('messageServices', []).factory('MessageService', [
  '$http',

  function($http) {
    return {
      list: function() {
        return $http.get('/api/messages');
      },
      get: function(id) {
        return $http.get('/api/messages/' + id);
      }
    }
  }
]);