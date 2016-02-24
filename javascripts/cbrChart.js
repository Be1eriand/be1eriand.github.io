(function () {

var app = angular.module('cbrChart',[]);

//app.directive('chart', function() {
//    return {
//            restrict: 'E',
//            templateUrl: 'chart.html'
//        };
//});

app.controller('cbrChartController', ['$scope', function ($scope) {

    $scope.xStat="Turn";
    $scope.yStat="Population";
    $scope.selectedCiv="Australia";
    $scope.ChartType="lineWithFocusChart";
    
    $scope.data = [];
    $scope.options = {
            chart: {
                type: 'lineWithFocusChart',
                height: 700,
                margin : {
                    top: 50,
                    right: 100,
                    bottom: 50,
                    left: 100
                },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: ""
                },
                yAxis: {
                    axisLabel: "",
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                x2Axis: {},
                y2Axis: {},
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

    this.updateData = function(ChartType,xVar,yVar,Civ,cbrData) {
        
        $scope.data = cbrUtilities.prepareData(cbrUtilities.covertDataToXY(cbrData,xVar,yVar),Civ,$scope.CivColors);
        
        if (ChartType=="lineWithFocusChart") {
        $scope.options = {
            chart: {
                type: ChartType, //'lineWithFocusChart'
                height: 700,
                margin : {
                    top: 50,
                    right: 100,
                    bottom: 50,
                    left: 100
                },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: xVar
                },
                yAxis: {
                    axisLabel: yVar,
                    tickFormat: function(d){
                        return d3.format('1f')(d);
                    }
                },
                x2Axis: {},
                y2Axis: {}
            }
        };
      }
        if (ChartType=="scatterChart") {
            $scope.options= {
                chart: {
                type: ChartType, //'scatterChart'
                height: 700,
                margin : {
                    top: 50,
                    right: 100,
                    bottom: 50,
                    left: 100
                },
                showDistX: true,
                showDistY: true,
                duration: 350,
                xAxis: {
                    axisLabel: xVar,
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                yAxis: {
                    axisLabel: yVar,
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                  enabled: true,
                  scaleExtent: [
                    1,
                    100
                  ],
                  useFixedDomain: true,
                  useNiceScale: false,
                  horizontalOff: false,
                  verticalOff: false,
                  unzoomEventType: "dblclick.zoom"
                }
              }
        }
    };
    }
    
}]);  
    

app.controller('cbrScatterController', ['$scope', function ($scope) {



    
}]);

    
})();