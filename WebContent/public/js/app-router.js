//Declarando modulos
angular.module('Authentication', []);
angular.module('HomeModule', []);

var app = angular.module('LoginModule', ['Authentication','HomeModule','ngRoute','ngCookies']);

app.config(['$routeProvider' , function( $routeProvider ) {
  $routeProvider
  .when('/', {
      templateUrl: "public/html/login.html",
      controller: "LoginController"
  })
  .when('/login', {
    templateUrl: "public/html/login.html",
    controller: "LoginController"
  })
   .when('/home', {
    templateUrl: "public/html/home.html",
    controller: "HomeController"
  })
  .otherwise({
    redirectTo: 'public/html/login.html'
  });
}]);

app.run(['$rootScope', '$location', '$cookieStore', '$http',
      function ($rootScope, $location, $cookieStore, $http) {
          // keep user logged in after page refresh
          $rootScope.globals = $cookieStore.get('globals') || {};
          if ($rootScope.globals.currentUser) {
              $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
          }
   
          $rootScope.$on('$locationChangeStart', function (event, next, current) {
              // redirect to login page if not logged in
              if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                  $location.path('/login');
              }
          });
      }]);
