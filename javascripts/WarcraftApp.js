(function () {
   
var app = angular.module('WarcraftApp',['ngRoute','WarcraftMain','WarcraftNav'],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'WarcraftHome.html'  
  })
  .when('/Home', {
    templateUrl: 'WarcraftHome.html'  
  })
  .otherwise({
    redirectTo: '/Home'
    });

});

})();               
        

 