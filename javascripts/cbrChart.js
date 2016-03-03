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
                    axisLabel: xVar,
                    tickFormat : function(d) {
                                if (xVar==="Turn") {
                                    var t = 0;
                                    if (d <= 100) {
                                        t  = (-4000 + d * 15)
                                    }
                                    if ((d > 100) & (d <= 400)) {    
                                        if (d == 350) {
                                            t  = 1;
                                        } else {
                                                t  = -2500 + (d - 100) * 10
                                        }
                                    }
                                    if ((d > 400) & (d <= 570)) {
                                        t  = 500 + (d - 400) * 5
                                    }
                                    if ((d > 570) & (d <= 771)) {
                                        t  = 1350 + (d - 570) * 2
                                    }

                                    if ((d > 771) & (d <= 900)) {
                                        t  = 1752 + (d - 771) * 1
                                    }
                                    if ((d > 900) & (d <= 1080)) {
                                        t  = 1881 + (d - 900) * 0.5
                                    }
                                    if ((d > 1080) & (d <= 1344)) {
                                        t  = 1971 + (d - 1080) * 0.25
                                    }
                                    if (d > 1344) {
                                        t  = 2037 + (d - 1344) * (1.0 / 12.0)
                                    }
                                    if (t <= 0) {
                                        return Math.abs(t) + "BC"
                                    } else if (t > 0) {
                                        return t + "AD"
                                    }
                                }
                                else {
                                        return d3.format('1f')(d);
                                }
                        }
                },
                yAxis: {
                    axisLabel: yVar,
                    tickFormat: function(d) {
                                if (yVar==="Turn") {
                                    var t = 0;
                                    if (d <= 100) {
                                        t  = (-4000 + d * 15)
                                    }
                                    if ((d > 100) & (d <= 400)) {    
                                        if (d == 350) {
                                            t  = 1;
                                        } else {
                                                t  = -2500 + (d - 100) * 10
                                        }
                                    }
                                    if ((d > 400) & (d <= 570)) {
                                        t  = 500 + (d - 400) * 5
                                    }
                                    if ((d > 570) & (d <= 771)) {
                                        t  = 1350 + (d - 570) * 2
                                    }

                                    if ((d > 771) & (d <= 900)) {
                                        t  = 1752 + (d - 771) * 1
                                    }
                                    if ((d > 900) & (d <= 1080)) {
                                        t  = 1881 + (d - 900) * 0.5
                                    }
                                    if ((d > 1080) & (d <= 1344)) {
                                        t  = 1971 + (d - 1080) * 0.25
                                    }
                                    if (d > 1344) {
                                        t  = 2037 + (d - 1344) * (1.0 / 12.0)
                                    }
                                    if (t <= 0) {
                                        return Math.abs(t) + "BC"
                                    } else if (t > 0) {
                                        return t + "AD"
                                    }
                                }
                                else {
                                        return d3.format('1f')(d);
                                }
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
                    tickFormat: function(d) {
                                if (xVar==="Turn") {
                                    var t = 0;
                                    if (d <= 100) {
                                        t  = (-4000 + d * 15)
                                    }
                                    if ((d > 100) & (d <= 400)) {    
                                        if (d == 350) {
                                            t  = 1;
                                        } else {
                                                t  = -2500 + (d - 100) * 10
                                        }
                                    }
                                    if ((d > 400) & (d <= 570)) {
                                        t  = 500 + (d - 400) * 5
                                    }
                                    if ((d > 570) & (d <= 771)) {
                                        t  = 1350 + (d - 570) * 2
                                    }

                                    if ((d > 771) & (d <= 900)) {
                                        t  = 1752 + (d - 771) * 1
                                    }
                                    if ((d > 900) & (d <= 1080)) {
                                        t  = 1881 + (d - 900) * 0.5
                                    }
                                    if ((d > 1080) & (d <= 1344)) {
                                        t  = 1971 + (d - 1080) * 0.25
                                    }
                                    if (d > 1344) {
                                        t  = 2037 + (d - 1344) * (1.0 / 12.0)
                                    }
                                    if (t <= 0) {
                                        return Math.abs(t) + "BC"
                                    } else if (t > 0) {
                                        return t + "AD"
                                    }
                                }
                                else {
                                        return d3.format('.2f')(d);
                                }
                        }
                },
                yAxis: {
                    axisLabel: yVar,
                    tickFormat: function(d) {
                                if (yVar==="Turn") {
                                    var t = 0;
                                    if (d <= 100) {
                                        t  = (-4000 + d * 15)
                                    }
                                    if ((d > 100) & (d <= 400)) {    
                                        if (d == 350) {
                                            t  = 1;
                                        } else {
                                                t  = -2500 + (d - 100) * 10
                                        }
                                    }
                                    if ((d > 400) & (d <= 570)) {
                                        t  = 500 + (d - 400) * 5
                                    }
                                    if ((d > 570) & (d <= 771)) {
                                        t  = 1350 + (d - 570) * 2
                                    }

                                    if ((d > 771) & (d <= 900)) {
                                        t  = 1752 + (d - 771) * 1
                                    }
                                    if ((d > 900) & (d <= 1080)) {
                                        t  = 1881 + (d - 900) * 0.5
                                    }
                                    if ((d > 1080) & (d <= 1344)) {
                                        t  = 1971 + (d - 1080) * 0.25
                                    }
                                    if (d > 1344) {
                                        t  = 2037 + (d - 1344) * (1.0 / 12.0)
                                    }
                                    if (t <= 0) {
                                        return Math.abs(t) + "BC"
                                    } else if (t > 0) {
                                        return t + "AD"
                                    }
                                }
                                else {
                                        return d3.format('.2f')(d);
                                }
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