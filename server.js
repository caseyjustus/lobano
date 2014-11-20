var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('friendsPosition', { lat: '132.252', lon: '67.252' });

  socket.on('watchPosition', function (data) {
    console.log('watchPosition');
    console.log(data);
  });

  socket.on('getPosition', function (data) {
    console.log('getPosition');
    console.log(data);
  });
});