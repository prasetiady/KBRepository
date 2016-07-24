function _ajax(settings, resolve, reject){
  $.ajax(settings).done(function(response){
    resolve(response);
  }).fail(function(jqXHR, textStatus){
    reject(jqXHR, textStatus);
  });
}

export function sparqlSelect(query) {
  return new Promise(function (resolve, reject) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8080/marmotta/sparql/select",
      "method": "POST",
      "headers": {
        "content-type": "application/sparql-query;",
        "accept": "application/sparql-results+json",
      },
      "data": query
    }
    _ajax(settings, resolve, reject);
  });
}

export function sparqlUpdate(query) {
  return new Promise(function (resolve, reject) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8080/marmotta/sparql/update",
      "method": "POST",
      "headers": {
        "content-type": "application/sparql-update;"
      },
      "data": query
    }
    _ajax(settings, resolve, reject);
  });
}
