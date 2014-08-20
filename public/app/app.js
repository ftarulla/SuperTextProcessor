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
        	controller: 'messageListCtrl' });
});