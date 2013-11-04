var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , url = require('url')  
  , path = require('path')   

app.listen(80);

function handler (req, res) {
    var uri = url.parse(req.url).pathname;  
	if(uri == "/") {
		uri = "/index.html"
	}
    var filename = path.join(__dirname, uri);
	path.exists(filename, function(exists) {  
		if(!exists) {  
	        response.writeHead(404, { "Content-Type": "text/plain" });  
	        response.write("404 Not Found\n");  
	        response.end();  
	        return;  
	     }  
		 
	 	fs.readFile(filename,
	 		function (err, data) {
	 			if (err) {
	 			  res.writeHead(500);
	 			  return res.end('Error loading index.html');
	 			}
	 			var contentType='none';  
	 	        var ext = path.extname(filename); 
	 			switch(ext)  
	 	        {  
	 	          case ".js":  
	 	            contentType = 'text/javascript';  
	 	            break;  
	 	          case ".css":  
	 	            contentType = 'text/css';  
	 	            break;  
	 			case ".html":
	 				contentType = 'text/html';
	 				break;
	 	        }  
	 			res.writeHead(200, { 'Content-Type': contentType });
	 			res.writeHead(200);
	 			res.end(data);
	 	});	
	 });
 }
// var arrClients = [];
io.sockets.on('connection', function (socket) {
  // arrClients.push(socket);
	socket.emit('news', { msg: 'welcome' });
	socket.on('EventNewMsg', function (data) {
	socket.broadcast.emit('news', data);
    console.log(data);
//	for (var i=0; i<arrClients.length; i++) {
// 		arrClients[i].emit('news', data);
// 	}
	
  });
});