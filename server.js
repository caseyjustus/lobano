var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('underscore');

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

var pool = [{key:42}, {key:5}];

io.sockets.on('connection', function (socket) {

    socket.on('watchPosition', function (data) {
        console.log('watchPosition');
        console.log(data);
        
        var keys = _.pluck(pool, 'key');
        var index = _.indexOf(keys, data.key);
        pool[index] = data;
        

        socket.emit('watchGroup', pool);
    });


/*
    socket.on('getPosition', function (data) {
        console.log('getPosition');
        console.log(data);
    });
*/
});