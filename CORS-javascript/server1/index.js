const fs = require('fs');
const http = require('http');
const url = require('url');

const data = 'Jelly!';

// creates our server.
const server = http.createServer((req, res) => {
	// anaylze url
	let params = url.parse(req.url, true);

	if (params.query.callback) {
		let str = params.query.callback + `('${data}')`;
		res.end(str);
	} else {
		res.end('');
	}
});

// listen on a specific port and a specific IP address
server.listen(8080, '127.0.0.1', () => {
	console.log('listening for requests now');
});
