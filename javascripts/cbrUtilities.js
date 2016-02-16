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

cbrUtilities.prepareData = function(data,Civ,CivColors) {

    var d = [],
        dataset = [];
        
    for (var i in Civ) {
        for (var c in data){
            if (c === Civ[i]) {
                d[Civ[i]] = data[c];
            }
        }
    }
    
    for (civ in d) {
        dataset.push({
            values: d[civ],
            key: civ,
            color: d3.rgb(CivColors[civ].Red*255, CivColors[civ].Green*255, CivColors[civ].Blue*255).toString()
        })
    }
    
    return dataset;
    
};



if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
  module.exports = cbrUtilities;
}

if (typeof(window) !== 'undefined') {
  window.cbrUtilities = cbrUtilities;
}
   
})();