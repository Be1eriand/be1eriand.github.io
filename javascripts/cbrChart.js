(function () {

var app = angular.module('cbrChart',[]);

//app.directive('chart', function() {
//    return {
//            restrict: 'E',
//            templateUrl: 'chart.html'
//        };
//});

app.controller('cbrChartController', ['$scope', function ($scope) {

    $scope.selectedStat="Turn";
    $scope.selectedCiv="Australia";
    
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

    this.updateData = function(xVar,yVar,Civ,cbrData) {
        
        $scope.data = cbrUtilities.prepareData(cbrUtilities.covertDataToXY(cbrData,xVar,yVar),Civ,$scope.CivColors);
        
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
                    axisLabel: xVar
                },
                yAxis: {
                    axisLabel: yVar,
                    tickFormat: function(d){
                        return d3.format('1f')(d);
                    }
                },
                x2Axis: {},
                y2Axis: {},
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };
    }
}]);  
    
    
})();