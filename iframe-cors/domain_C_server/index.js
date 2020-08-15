const http = require('http');

// 1. creates our server.
// 2. send sample resposne due to accepted data
const server = http.createServer((req, res) => {
	var data = '';
	req.on('data', function(chunk) {
		data += chunk.toString();
	});
	req.on('end', function() {
		console.log('POSTed: ' + data);
		res.writeHead(200);
		let commandString = "<script type='text/javascript'>parent.done('Server received posted Data!')</script>";
		res.end('ok');
	});
});

// 3. listen on a specific port and a specific IP address
server.listen(8083, '127.0.0.1', () => {
	console.log('listening for requests now');
});
