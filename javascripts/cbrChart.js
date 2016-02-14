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
        
        var dataset = cbrData.filter(function(d) {
             for (i in Civ) {
              if (d["Civilization"] === Civ[i]) {return true;}
             } 
            return false;
            });

            $scope.selectedStat = yVar;
            $scope.selectedCiv = Civ;
    
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
            
         var chart= d3.select("#graph")
                      .remove();
                  
                d3.select("#Chart")
                  .append("div")
                  .attr("id","graph");
                  
        function dotTheDots(d,i) {
            console.log(d3.event !== null ? d3.event.clientX : 0);
            console.log(d3.event !== null ? d3.event.clientY : 0);
        }
                               
        var vis = d3.select("#graph")
                    .append("svg")
                    .on("mousemove",dotTheDots)
                    .text(name)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    
        var extent = function(d,key){
                    var min = 0;
                    var max = 0;
                    
                    d.forEach(function(value){
                        if (value[key]<min) {
                            min = +value[key];             
                        };
                        if (value[key]>max) {
                            max = +value[key];
                        };
                    });
                    
                    return [min,max];
            }; 

        var x = d3.scale.linear()
                  .range([0, width])
                  .domain(extent(dataset,xVar));
                  
        var y = d3.scale.linear()
                  .range([height,0])
                  .domain(extent(dataset,yVar));
                  
        var xAxis = d3.svg.axis()
                      .scale(x)
                      .orient("bottom")
                      .ticks(10);

        var yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left")
                      .ticks(10);
                      
        var line = d3.svg.line()
                     .x(function(d) {
                        return x(d[xVar]);
                        })
                     .y(function(d) {
                        return y(d[yVar]);
                        });
            
            vis.append("g")
               .attr("class", "axis axis--x")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis);
               
            vis.append("g")
               .attr("class", "axis axis--y")
               .call(yAxis)
               .append("text")
               .attr("class", "axis-title")
               .attr("transform", "rotate(-90)")
               .attr("y", 10)
               .text(yVar);

            var lineColour = {};
            
            for (i in Civ) {
                 for (j in $scope.CivColors) {
                    if ($scope.CivColors[j].Civilization===Civ[i]) {
                        var s = d3.rgb($scope.CivColors[j].Red*255,$scope.CivColors[j].Green*255, $scope.CivColors[j].Blue*255)
                        lineColour[i] = s.toString();
                    }
                }
            }
            var legend = vis.selectAll("g.legend")
                    .data(Civ)
                    .enter().append("svg:g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) { return "translate(" + (100) + "," + (i * 20) + ")"; });
              
                legend.append("svg:circle")
                    .attr("r", 5)
                    .style("fill",function(d,i) {return lineColour[i]});

              
                legend.append("svg:text")
                    .attr("x", 12)
                    .attr("dy", ".31em")
                    .text(function(d) { return d; });
               
            for (i in Civ) {
                vis.append("path")
                   .datum(dataset.filter(function(d) {return d["Civilization"] === Civ[i]}))
                   .attr("class", "line")
                   .attr("d", line)
                   .style("stroke",lineColour[i]);
            }
                         
    };
        
        
}]);  
    
    
})();