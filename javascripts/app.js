(function () {
var app = angular.module('cbrdataapp',['cbrData','cbrChart','cbrNav'],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');
});

app.directive('cbrtable', function(){
             
        return {
            restrict: 'E',
            templateUrl: 'table.html'
        };
              
     });
 
 app.filter("cbrSelect", function() { // register new filter
     return function(row, stat, value) { // filter arguments
        try {
            return row.filter(function(d) {
                return d[stat] == value;
            });// implementation
        }
        catch(x){
            return false;
        }
    };
    
 });
  
app.controller('cbrImportController',['$scope', function($scope){
    $scope.InfoAddictData = {};
    $scope.ImportedCivList = {};
    
    this.CivFileLoaded = 0;
    this.DataFileLoaded = 0;

    
    this.ImportCivilisation = function(importCivFile){ //"data/InfoAddictLog.csv"
        $scope.ImportedCivList = d3.csv.parse(importCivFile);
        this.CivFileLoaded = 1;
    };
   
    this.ImportInfoAddictData = function(importDataFile){ //"data/InfoAddictHistoricalData.csv"
            $scope.InfoAddictData = d3.csv.parse(importDataFile, function (d){
                splitValues = d.Value.split(" ");
                if (splitValues[0]==="") {
                    splitValues.shift()
                }

                 var InfoData = {};
                 
                 for (s in splitValues) {
                    var t = {};
                        t = splitValues[s].split(":");
                        
                        InfoData[t[0]] = t[1];
                 }
                
                return {
                    'Turn': +d.Turn,
                    'Player': +d.Player,
                    'Civilization': $scope.ImportedCivList[+d.Player].Civilization,
                    'Net Gold per Turn': InfoData['g'],
                    "Gross Gold per Turn": InfoData['i'],
                    "Treasury": InfoData['tg'],
                    "Military Manpower": InfoData['m'],
                    "Score": InfoData['s'],
                    "Happiness": InfoData['h'],
                    "Science": InfoData['sc'],
                    "Techs": InfoData['t'],
                    "Land": InfoData['l'],
                    "Production": InfoData['p'],
                    "Food": InfoData['f'],
                    "Social Policies": InfoData['c'],
                    "Culture per Turn": InfoData['cc'],
                    "Population": InfoData['po'],
                    "Number of Cities": InfoData['nc'],
                    "Wonders": InfoData['w'],
                    "Total Faith": InfoData['fa'],
                    "Faith per Turn": InfoData['fr'],
                    "Trade Routes": InfoData['tru'],
                    "Great Works": InfoData['gw'],
                    "Number of Civs Influenced": InfoData['in'],
                    "Tourism": InfoData['to']
                    };
                });
        this.DataFileLoaded = 1;
    };    
    
    this.SaveInfoAddictData = function(SaveFile){
        
        InfoAddictCSV = d3.csv.format($scope.InfoAddictData)
        
        var d=document, a=d.getElementById('savelink'), t=SaveFile, xx, b, u
                try {
                                        //b = new Blob([SaveFile,InfoAddictCSV])
                                        //b.type = 'text/plain'
                                        //xx = x
                                        //console.error(x)
                        window.URL = window.URL || window.webkitURL;
                                        
                        b = new Blob([InfoAddictCSV])
                        b.type = 'text/plain'
                        u = window.URL.createObjectURL(b);
                        if(u!==u+'')
                                        return alert('createObjectURL returned '+u);
                        a.href = u
                        a.click()
                } catch(x) {
                                alert(xx||x)
                }

        
        
        this.CivFileLoaded = 0;
        this.DataFileLoaded = 0;
        };
    
    this.CanShowSaveButton = function(){
        return (this.DataFileLoaded===1)&&(this.CivFileLoaded===1);
        };
        
    this.CanShowImportDataButton = function(){
        return (this.CivFileLoaded===1);
        };
    
}]);

})();               
        

 