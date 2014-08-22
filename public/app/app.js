angular.module('app', [
	'ngResource', 
	'ngRoute', 
	'messageControllers',
	'messageServices']);

angular.module('app').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { 
        	templateUrl: '/app/partials/messageList.html', 
        	controller: 'messageListCtrl' })
        .when('/messages/create', {
          templateUrl: '/app/partials/messageCreate.html', 
          controller: 'messageCreateCtrl' })
        .when('/messages/modify/:id', {
          templateUrl: '/app/partials/messageCreate.html', 
          controller: 'messageModifyCtrl' })
        .when('/messages/:id', {
          templateUrl: '/app/partials/messageDetail.html', 
          controller: 'messageDetailCtrl' });
});
