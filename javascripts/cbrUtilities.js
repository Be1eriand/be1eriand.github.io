(function () {
    
var cbrUtilities = {}; 

cbrUtilities.covertDataToXY = function(data,xVar,yVar) {

    var c = {};

    for (var i in data) {
        var d = [];
        
        for (j in data[i].values) {
            d.push({x: +data[i].values[j][xVar] , y: +data[i].values[j][yVar]});
        }
        c[data[i].key] = d;
    }

return c;
};





if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
  module.exports = cbrUtilities;
}

if (typeof(window) !== 'undefined') {
  window.cbrUtilities = cbrUtilities;
}
   
})();