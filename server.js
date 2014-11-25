var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('underscore');
//var expool = require('./public/example/pool.js')

server.listen(3000);

// these should be hosted elsewhere
app.get('/kid-a/', function (req, res) {
    res.sendFile(__dirname + '/public/example/kid-a.html');
});
app.get('/kid-b/', function (req, res) {
    res.sendFile(__dirname + '/public/example/kid-b.html');
});
app.get('/kid-c/', function (req, res) {
    res.sendFile(__dirname + '/public/example/kid-c.html');
});


// should these be hosted here or thru implementation?
app.get('/js/lobano.js', function (req, res) {
    res.sendFile(__dirname + '/public/js/lobano.js');
});

app.get('/js/latlon.js', function (req, res) {
    res.sendFile(__dirname + '/node_modules/geodesy-libraries/latlon.js');
});

//console.log(expool);



// need to move into api
// individual keys need to be accessible directly from client 
// interfaces need to be data storage agnostic

var pool = [
        {key:'Kid A'},
        {key:'Kid B'},
        {key:'Kid C'}
    ];



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