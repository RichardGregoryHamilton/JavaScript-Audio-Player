function callback( obj ) {
    var i, data, html='';
    try {
        data = obj.query.results.json.data;
        for (i = 0; i<data.length; i++) {
            html += '<tr><td><img src="' + data[i].icon + '"></td><td>' + data[i].name + '</td></tr>';
        }
        html = '<table>' + html + '</table>';
    }
    catch(e) {
        html = 'No search results.' 
    }
    document.getElementById('output').innerHTML = html;
}

// cross-domain ajax via proxy 
function search() {
    var keyword = document.getElementById('keyword').value;
    keyword     = keyword.replace(/\s/g,'+');
    var proxy   = 'https://query.yahooapis.com/v1/public/yql';
    var query   = "?q=" + encodeURIComponent( "select * from json where url='http://rdio-service.herokuapp.com//search?q=" + keyword + "'" ); 
    var options = '&diagnostics=true&format=json&callback=callback';
    var head    = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = proxy + query + options;
    head.appendChild(script);
}
    
search( ); 
