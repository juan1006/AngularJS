'use strict';
 
angular.module('HomeModule')
 
.controller('HomeController',
		['$scope','$rootScope','$cookieStore',
  function ($scope,$rootScope,$cookieStore) {
	  $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
    	  $scope.nombreUsuario = $rootScope.globals.currentUser.username; // jshint ignore:line
      }
  }]);