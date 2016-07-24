export function transformSparqlResults(sparqlResults) {
  var items = [];
  for (var i = 0; i < sparqlResults.results.bindings.length; i++) {
    var item = {};
    for (var j = 0; j < sparqlResults.head.vars.length; j++) {
      var variable = sparqlResults.head.vars[j];
      item[variable] = sparqlResults.results.bindings[i][variable].value;
    }
    items.push(item);
  }
  return items;
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
