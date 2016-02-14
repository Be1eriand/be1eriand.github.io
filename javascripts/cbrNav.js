(function() {
 
var app = angular.module('cbrNav',[]);

app.directive('cbrnavbar', function() {
                   
    return {
      restrict: 'E',
      templateUrl: 'cbrNavbar.html',
    };
  });
 
app.controller('cbrnavController',['$rootScope', function ($rootScope) {
        $rootScope.cbrTab = 1;
        this.hash = location.hash;
        
        this.selecthref = function(hash){
            if (hash=="#Home") {
                this.selectTab(1);
            }
            if (hash=="#Chart") {
                this.selectTab(2);
            }
            if (hash=="#Table") {
                this.selectTab(3);
            }
            if (hash=="#Import Data") {
                this.selectTab(4);
            }
            if (hash=="Sneak Peek") {
                this.selectTab(5);
            }
            if (hash=="#Research Power") {
                this.selectTab(6);
            }            
            };
        
        this.selectTab = function(setTab){
            $rootScope.cbrTab = setTab;
        };
  
        this.isSelected = function(checkTab){
            return ($rootScope.cbrTab === checkTab);
            };
            
        this.selecthref(this.hash);
}]);
 
 })();
