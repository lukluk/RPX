console.log('Loading a web page');
var process = require("child_process");
var spawn = process.spawn;
var execFile = process.execFile;
var webserver = require('webserver');
var server = webserver.create();
var service = server.listen('104.236.88.233:8080', function(request, response) {
	response.statusCode = 200;
	var url = '';

	response.setHeader('Access-Control-Allow-Origin', '*');

	if (request.url) {
		var a = request.url.split('=');
		url = a[1];
		console.log('exexe');
		execFile("phantomjs", ['exe.js',url], null, function(err, stdout, stderr) {

			console.log("execFileSTDERR:", JSON.stringify(stderr))
			var o= stdout.replace('Unsafe JavaScript attempt to access frame with URL about:blank from frame with URL file://exe.js. Domains, protocols and ports must match.','');
			response.write(o);
			response.close()
		})

	}


});
