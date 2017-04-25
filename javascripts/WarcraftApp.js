(function () {
   
var app = angular.module('WarcraftApp',['ngRoute','WarcraftNav'],
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
  .when('/Analysis',{
      templateUrl: 'WarcraftAnalysis.html' //,
      //controller: 'WarcraftAnalysisController'
  })
  .otherwise({
    redirectTo: '/Home'
    });

});

})();               
        

 