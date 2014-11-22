var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/js/lobano.js', function (req, res) {
  res.sendFile(__dirname + '/public/js/lobano.js');
});

app.get('/js/latlon.js', function (req, res) {
  res.sendFile(__dirname + '/node_modules/geodesy-libraries/latlon.js');
});


//app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {

  socket.emit('friendsPosition', { lat: '112.252', lon: '67.252' });


  socket.on('watchPosition', function (data) {
    console.log('watchPosition');
    console.log(data);
  });


  socket.on('getPosition', function (data) {
    console.log('getPosition');
    console.log(data);
  });

});