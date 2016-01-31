(function () {
var app = angular.module('cbrData',[]);

app.controller('cbrDataController', ['$scope','$rootScope', function ($scope,$rootScope) {
    
    $scope.cbrdata ={};
    $scope.cbrdata.parsed = {};
    $scope.cbrdata.turn = {};
    $scope.cbrdata.civ = {};
    $scope.stats = {};
    $scope.civilisations = {};
    $scope.selectedCiv = {};
    $scope.selectedStat = {};
    $scope.cbrTab = 1;
    
    this.selectTab = function(setTab){
        $scope.cbrTab = setTab;
    };
    
    this.isSelected = function(checkTab){
        return ($rootScope.cbrTab === checkTab);
        };
    
    d3.text("data/Stats.csv", function(data){   
      $scope.stats = d3.csv.parse(data,function(d){
            return d.Stat;
        });
        //$scope.stats.sort();
        $scope.selectedStat = $scope.stats[0];
    });
   
   d3.text("data/Civilisation.csv", function(data){   
       $scope.civilisations = d3.csv.parse(data,function(d){
            return d.Civilization;
       });
       $scope.civilisations.sort();
       $scope.selectedCiv = $scope.civilisations[0];
    });
   
    d3.text("data/CBR Data.csv", function(datasetText) {

    var parsedCSV = d3.csv.parse(datasetText);
        
    $scope.cbrdata.parsed = parsedCSV;
    
    $scope.cbrdata.parsedRows = d3.csv.parseRows(datasetText)
        
    $scope.cbrdata.turn = d3.nest()
                            .key(function(d) { return d.Turn})
                            .entries(parsedCSV);
                                
    $scope.cbrdata.civ = d3.nest()
                            .key(function(d) { return d.Civilization})
                            .entries(parsedCSV);
    
    });

    this.CreateChart = function(xVar,yVar,Civ) {
        
        var dataset = $scope.cbrdata.parsed.filter(function(d) {return d["Civilization"] == Civ});
        
            $scope.selectedStat = yVar;
            $scope.selectedCiv = Civ;
    
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
            
         var chart= d3.select("chart")
                      .remove();
                  
                d3.select("#cbrChart")
                  .append("chart")
                  .append("div")
                  .attr("id","graph")
                               
        var vis = d3.select("#graph")
                    .append("svg")
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
               
            vis.append("path")
               .datum(dataset)
               .attr("class", "line")
               .attr("d", line);
                          
    };
    
    this.CreateTable = function(){
        
        var dataset = $scope.cbrdata.parsed;
            columns = $scope.stats;
        
        
        var cbrTable = d3.select("#table")
                        .append("table")
                        .attr("class","table table-bordered")
                        .style("width","1925px")
                        .style("border-collapse", "collapse")
                        .style("border","1px"),
            cbrHead = cbrTable.append("cbrHead");
            //cbrBody = cbrTable.append("cbrBody");
            
            cbrHead.append("tr")
                    //.attr("class", "table table-bordered")
                    .selectAll("th")
                    .data(columns)
                    .enter()
                    .append("th")
                    //.attr("class", "table table-bordered")
                    .text(function(column) { return column; });
                    
        var cbrTableRow = cbrHead.selectAll("tr")
                        .data(dataset)
                        .enter()
                        .append("tr")
                        //.attr("class", "table table-bordered");
                        
         var cbrTableData  = cbrTableRow.selectAll("td")
                                        .data(function(row) {
                                                    return columns.map(function(column) {
                                                            return {column: column, value: row[column]};
                                                });
                                            })
                                        .enter().append("td")
                                        //.attr("class", "table table-bordered")
                                        .style("text-align","left")
                                        .text(function(d){
                                            return d.value;
                                            });
        
    }
    
}]);
    
})();