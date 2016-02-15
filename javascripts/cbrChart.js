(function () {

var app = angular.module('cbrChart',[]);

app.directive('chart', function() {
    return {
            restrict: 'E',
            templateUrl: 'chart.html'
        };
});

app.controller('cbrChartController', ['$scope', function ($scope) {
    this.vis = d3.select("#graph")
    
    this.CreateChart = function(xVar,yVar,Civ,cbrData) {
        
    nv.addGraph(function() {
        var data = [];
            dataset = [];
            
        d = cbrUtilities.covertDataToXY(cbrData,xVar,yVar);
        
        for (var i in Civ) {
            for (var c in d){
                if (c === Civ[i]) {
                    data[Civ[i]] = d[c];
                }
            }
        }
        
        var chart = nv.models.lineChart()
                    .useInteractiveGuideline(true)
                    .showLegend(true)
                    .showYAxis(true)
                    .showXAxis(true)
                    .x(function(d) {return d.x;})
                    .y(function(d) {return d.y;})
            
        for (civ in data) {
            var d = {};
            dataset.push({
                values: data[civ],
                key: civ,
                color: d3.rgb($scope.CivColors[civ].Red*255,$scope.CivColors[civ].Green*255, $scope.CivColors[civ].Blue*255).toString()
            })
        }
        
        chart.xAxis     //Chart x-axis settings
             .axisLabel(xVar);

        chart.yAxis     //Chart y-axis settings
             .axisLabel(yVar)
             .tickFormat(d3.format("f"));
        
        d3.select('#graph svg')
          .datum(dataset)
          .call(chart);
    
        nv.utils.windowResize(function() { chart.update() });
        
        return chart;
    
    });
                      
    };
 
        
}]);  
    
    
})();