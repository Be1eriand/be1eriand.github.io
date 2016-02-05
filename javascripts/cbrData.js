(function () {
var app = angular.module('cbrData',[]);

var InfoAddictStats = {
g: "Net Gold per Turn",
i: "Gross Gold per Turn",
tg: "Treasury",
m: "Military Manpower",
s: "Score",
h: "Happiness",
sc: "Science",
t: "Techs",
l: "Land",
p: "Production",
f: "Food",
c: "Social Policies",
cc: "Culture per Turn",
po: "Population",
nc: "Number of Cities",
w: "Wonders",
fa: "Total Faith",
fr: "Faith per Turn",
tru: "Trade Routes",
gw: "Great Works",
in: "Number of Civs Influenced",
to: "Tourism" };

app.controller('cbrDataController', ['$scope','$rootScope', function ($scope,$rootScope) {
    
    $scope.cbrdata ={};
    $scope.cbrdata.parsed = {};
    $scope.cbrdata.turn = {};
    $scope.cbrdata.civ = {};
    $scope.stats = {};
    $scope.civilisations = {};
    $scope.selectedCiv = {};
    $scope.selectedStat = {};

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
   
   this.data = $scope.cbrdata.parsed;
   
    this.CreateTable = function(){
        
        var dataset = $scope.cbrdata.parsed;
            columns = $scope.stats;
        
        
        var cbrTable = d3.select("#table")
                        .append("cbrTable")
                        .attr("class","table table-bordered")
                        .style("width","1925px")
                        .style("border-collapse", "collapse")
                        .style("border","1px");
//            cbrHead = cbrTable.append("cbrHead");
            //cbrBody = cbrTable.append("cbrBody");
            
        //    cbrHead.append("tr")
        //            //.attr("class", "table table-bordered")
        //            .selectAll("th")
        //            .data(columns)
        //            .enter()
        //            .append("th")
        //            //.attr("class", "table table-bordered")
        //            .text(function(column) { return column; });
        //            
        //var cbrTableRow = cbrHead.selectAll("tr")
        //                .data(dataset)
        //                .enter()
        //                .append("tr")
        //                //.attr("class", "table table-bordered");
        //                
        // var cbrTableData  = cbrTableRow.selectAll("td")
        //                                .data(function(row) {
        //                                            return columns.map(function(column) {
        //                                                    return {column: column, value: row[column]};
        //                                        });
        //                                    })
        //                                .enter().append("td")
        //                                //.attr("class", "table table-bordered")
        //                                .style("text-align","left")
        //                                .text(function(d){
        //                                    return d.value;
        //                                    });
        
    }
    
}]);
    
})();