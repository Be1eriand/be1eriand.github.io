(function () {
var app = angular.module('cbrdataapp',['cbrData'],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');
});

app.directive('chart', function() {
    return {
            restrict: 'E',
            templateUrl: 'chart.html'
        };
});

app.controller('cbrChartController', ['$scope', function ($scope) {
    this.vis = d3.select("#graph")
                 
}]);

app.directive('cbrnavbar', function() {
                   
    return {
      restrict: 'E',
      templateUrl: 'cbrnavbar.html'
    };
  });
 
 app.controller('cbrnavController',['$rootScope', function ($rootScope) {
        $rootScope.cbrTab = 1;
        
        this.selectTab = function(setTab){
            $rootScope.cbrTab = setTab;
        };
  
        this.isSelected = function(checkTab){
            return ($rootScope.cbrTab === checkTab);
            };        
                 
}])

})();

    //
    //
    //<script type="text/javascript">
    //    function exportToCsv() {
    //        var myCsv = "Col1,Col2,Col3\nval1,val2,val3";
    //
    //        window.open('data:text/csv;charset=utf-8,' + escape(myCsv));
    //    }
    //
    //    var button = document.getElementById('b');
    //    button.addEventListener('click', exportToCsv);
    //</script>
    
                                
        

 