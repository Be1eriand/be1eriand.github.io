(function() {
 
var app = angular.module('WarcraftNav',[]);

app.directive('Warcraftnavbar', function() {
                   
    return {
      restrict: 'E',
      templateUrl: 'WarcraftNavbar.html',
    };
  });
 
app.controller('WarcraftnavController',['$rootScope', function ($rootScope) {
        $rootScope.WarcraftTab = 1;
        this.hash = location.hash;
        
        this.selecthref = function(hash){
            if (hash=="#Home") {
                this.selectTab(1);
            }           
            };
        
        this.selectTab = function(setTab){
            $rootScope.WarcraftTab = setTab;
        };
  
        this.isSelected = function(checkTab){
            return ($rootScope.WarcraftTab === checkTab);
            };
            
        this.selecthref(this.hash);
}]);
 
 })();
