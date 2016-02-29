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
    $scope.civilisations = [];
    $scope.selectedCiv = {};
    $scope.selectedStat = {};
    $scope.parsed = {};
    $scope.CivColors = {};

    this.isSelected = function(checkTab){
        return ($rootScope.cbrTab === checkTab);
        };
    
    d3.text("data/Civ Colors.csv", function(data) {
        var colordata = d3.csv.parse(data);
            for (var i in colordata) {
               $scope.CivColors[colordata[i].Civilization] = colordata[i];
            }
    });
   
    d3.text("data/CBR.Data.csv", function(datasetText) {

    var parsedCSV = d3.csv.parse(datasetText);
        
    $scope.cbrdata.parsed = parsedCSV;
    
    $scope.cbrdata.parsedRows = d3.csv.parseRows(datasetText);
    
    $scope.stats = $scope.cbrdata.parsedRows[0];
    
    $scope.selectedStat = $scope.stats[0];

    $scope.parsed = parsedCSV;
        
    $scope.cbrdata.turn = d3.nest()
                            .key(function(d) { return d.Turn})
                            .entries(parsedCSV);
                                
    $scope.cbrdata.civ = d3.nest()
                            .key(function(d) { return d.Civilization})
                            .entries(parsedCSV);
    
    for (var i in $scope.cbrdata.civ) {
        $scope.civilisations[i] = $scope.cbrdata.civ[i].key;
    }
    
    $scope.civilisations.sort();
    $scope.selectedCiv = $scope.civilisations[0];
    
    });
    
}]);
    
})();
