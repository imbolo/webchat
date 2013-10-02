var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
var arrClients = [];
io.sockets.on('connection', function (socket) {
  arrClients.push(socket);
  socket.emit('news', { msg: 'welcome' });
  socket.on('EventNewMsg', function (data) {
    console.log(data);
	for (var i=0; i<arrClients.length; i++) {
		arrClients[i].emit('news', data);
	}
	
  });
});