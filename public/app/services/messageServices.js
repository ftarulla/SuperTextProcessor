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
      },
      create: function(text) {
        return $http.post('/api/messages/', {"text": text});
      },
      delete: function(id) {
        return $http.delete('/api/messages/' + id);
      },
      update: function(id, text) {
        return $http.put('/api/messages/' + id, {"text": text});
      }
    }
  }
]);