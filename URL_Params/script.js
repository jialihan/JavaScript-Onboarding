
// 1. URLSearchParams
var paramsString = "?age=29&na#me=jelly#hpos";
var searchParams = new URLSearchParams(paramsString);
searchParams.get('name'); // null
searchParams.get('na#me'); // 'jelly#pos' - invalid

// 2. regex
var regex = /[?&]([^=#]+)=([^&#]*)/g;
var url = "www.domain.com/?age=29&name=je=lly#hpos";
var params = {};
var match;
while (match = regex.exec(url)) {
    params[match[1]] = match[2];
}
console.log(params); // {age: 29, name: 'je=lly'} 


// 3. string manipulation
function parseURL(s) {
    if (s.indexOf('?') < 0) {
        return null;
    }
    var start = s.indexOf('?');
    s = s.slice(start + 1, s.length);
    var end = s.indexOf('#');
    if (end >= 0) {
        s = s.slice(0, end);
    }
    var queries = s.split("&");
    params = {};
    for (var query of queries) {
        // split at the first `=`
        var index = query.indexOf('=');
        var key = query.slice(0, index);
        var value = query.slice(index + 1, query.length);
        params[key] = value;
    }
    console.log(params);
    return params;
}
parseURL(url);