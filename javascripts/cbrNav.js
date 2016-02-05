(function() {
 
var app = angular.module('cbrNav',[]);

app.directive('cbrnavbar', function() {
                   
    return {
      restrict: 'E',
      templateUrl: 'cbrnavbar.html',
    };
  });
 
app.controller('cbrnavController',['$rootScope', function ($rootScope) {
        $rootScope.cbrTab = 1;
        
        this.selectTab = function(setTab){
            $rootScope.cbrTab = setTab;
        };
  
        this.isSelected = function(checkTab){
            return ($rootScope.cbrTab === checkTab);
            };        
                 
}]);
 
 })();
