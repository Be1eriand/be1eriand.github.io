(function() {
 
var app = angular.module('cbrNav',[]);

app.directive('cbrnavbar', function() {
                   
    return {
      restrict: 'E',
      template: cbrnavbar.html,
    };
  });
 
 })();
