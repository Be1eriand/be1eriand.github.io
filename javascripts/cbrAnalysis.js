(function(){
var app = angular.module('cbrAnalysis', ['nvd3']);

var processData = function(datatext,xVar,yVar,CivColors) {
  var s = [];
d3.text(datatext, function(data) {
  
  var parsedCSV = d3.csv.parse(data);

  var nestedData = d3.nest()
                     .key(function(d) {return d["Civilization"]})
                     .entries(parsedCSV);
                     
  for (var i in nestedData){
    var t = [];
    for (var j in nestedData[i].values) {
      t.push({x: nestedData[i].values[j][xVar], y: nestedData[i].values[j][yVar]});
    }
    var CivColor = CivColors.filter(function(d) {
              if (d.key === nestedData[i].key) {
                return true;
              }
                return false;
            });
    
    s.push({key: nestedData[i].key, values: t, color: CivColor[0].value});
  }
});

return s;
} ;
    
app.directive('cbrData', function(){
             
        return {
            restrict: 'A',
            controller: function($scope){
                $scope.datatext = {};
            }
            
        };
              
     });    

app.controller('cbrAnalysisController',['$scope', function($scope){
        
        $scope.CivColors=[];
        
        d3.text("data/Civ Colors.csv", function(data) {
                var d = d3.csv.parse(data);
                
                for (var i in d) {
                   $scope.CivColors.push({key: d[i].Civilization, value: d3.rgb(+d[i].Red*255,+d[i].Green*255,+d[i].Blue*255).toString()});       
                }
           });
        
           $scope.options = {
                        chart: {
                type: 'lineChart',
                height: 630,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){
                    return d.x;
                    }, // generalise this with an attribute
                y: function(d){ 
                    return d.y;
                    }, //generalise this with an attribute
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Turn'
                },
                yAxis: {
                    axisLabel: 'Research Power',
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            }
            
            };
            
           $scope.data = processData('data/CBR Data.csv','Turn','Research Power',$scope.CivColors);
           
           
}]);

})();

