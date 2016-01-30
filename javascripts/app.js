(function () {
var app = angular.module('cbrdataapp',[],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');
});

app.controller('cbrDataController', ['$scope', function ($scope) {
    
    $scope.cbrdata ={};
    $scope.cbrdata.parsed = {};
    $scope.cbrdata.turn = {};
    $scope.cbrdata.civ = {};
    $scope.stats = {};
    $scope.civilisations = {};
    $scope.selectedCiv = {};
    $scope.selectedStat = {};
    
    d3.text("data/Stats.csv", function(data){   
      $scope.stats = d3.csv.parse(data,function(d){
            return d.Stat;
        });
        $scope.stats.sort();
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
        
    $scope.cbrdata.turn = d3.nest()
                            .key(function(d) { return d.Turn})
                            .entries(parsedCSV);
                                
    $scope.cbrdata.civ = d3.nest()
                            .key(function(d) { return d.Civilization})
                            .entries(parsedCSV);
    
    });

    this.SetCivilisation = function(Civ) {
        $scope.selectedCiv = Civ;
    };
    
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
          d3.select("#viz")
            .append("table")
            .style("border-collapse", "collapse")
            .style("border", "2px black solid")
        
            .selectAll("tr")
            .data($scope.cbrdata.parsed)
            .enter().append("tr")
            
            .selectAll("td")
            .data(function(d){return d;})
            .enter().append("td")
            .style("border", "1px black solid")
            .style("padding", "5px")
            .on("mouseover", function(){d3.select(this).style("background-color", "aliceblue")})
            .on("mouseout", function(){d3.select(this).style("background-color", "white")})
            .text(function(d){return d;})
            .style("font-size", "12px");     
        
    }
    
}]);

app.directive('chart', function() {
    return {
            restrict: 'E',
            templateUrl: 'chart.html'
        };
});

app.directive('cbrnavbar', function() {
                   
    return {
      restrict: 'E',
      template: cbrnavbar.html,

    };
    
  });


app.controller('cbrChartController', ['$scope', function ($scope) {
    this.vis = d3.select("#graph")
                 
}]);

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
    
                                
        

 