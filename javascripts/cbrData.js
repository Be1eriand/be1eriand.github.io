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
    $scope.parsed = {};
    $scope.CivColors = {};

    this.isSelected = function(checkTab){
        return ($rootScope.cbrTab === checkTab);
        };
    
    d3.text("data/Civ Colors.csv", function(data) {
        $scope.CivColors = d3.csv.parse(data);
    });
       
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
    
    $scope.cbrdata.parsedRows = d3.csv.parseRows(datasetText);

    $scope.parsed = parsedCSV;
        
    $scope.cbrdata.turn = d3.nest()
                            .key(function(d) { return d.Turn})
                            .entries(parsedCSV);
                                
    $scope.cbrdata.civ = d3.nest()
                            .key(function(d) { return d.Civilization})
                            .entries(parsedCSV);
    
    });
    
}]);
    
})();