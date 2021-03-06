(function () {
   
var app = angular.module('cbrDataApp',['ngRoute','cbrData','cbrChart','cbrNav','cbrImport','nvd3'],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'cbrHome.html'  
  })
  .when('/Home', {
    templateUrl: 'cbrHome.html'  
  })
   .when('/Chart', {
    templateUrl: 'cbrChart.html',
    controller: 'cbrChartController as chartCtrl'
  })
  .when('/Table', {
    templateUrl: 'cbrTable.html'
  })
  .when('/ImportData',{
      templateUrl: 'cbrImport.html',
      controller: 'cbrImportController'
  })
  .when('/SneakPeek',{
      templateUrl: 'cbrSneakPeek.html'
  })
  .when('/Analysis',{
      templateUrl: 'cbrAnalysis.html' //,
      //controller: 'cbrAnalysisController'
  })
  .when('/Analysis/#Research Power',{
      templateUrl: 'cbrAnalysis.html' //,
      //controller: 'cbrAnalysisController'
  })
  .otherwise({
    redirectTo: '/Home'
    });

});

 app.filter("cbrSelect", function() {
     return function(row, stat, value) {
        try {
            return row.filter(function(d) {
                return d[stat] == value;
            });
        }
        catch(x){
            return false;
        }
    };
    
 });

})();               
        

 