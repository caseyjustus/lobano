var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('underscore');
var fs = require('fs');


server.listen(3000);


//could be hosted elsewhere
app.get('/angularExample', function (req, res) {
    res.sendFile(__dirname + '/public/examples/angularExample.html');
});
app.get('/jqueryExample', function (req, res) {
    res.sendFile(__dirname + '/public/examples/jqueryExample.html');
});
app.get('/consoleExample', function (req, res) {
    res.sendFile(__dirname + '/public/examples/consoleExample.html');
});



//TODO make actual api
app.get('/api', function (req, res) {
    res.sendFile(__dirname + '/public/examples/pool.json');
});



// should these be hosted here or thru implementation?
app.get('/js/lobano.js', function (req, res) {
    res.sendFile(__dirname + '/public/js/lobano.js');
});
app.get('/js/latlon.js', function (req, res) {
    res.sendFile(__dirname + '/node_modules/geodesy-libraries/latlon.js');
});

//console.log(expool);







function activateWatchSocket(pool){
    io.sockets.on('connection', function (socket) {

        socket.on('watchPosition', function (data) {
            console.log('watchPosition');

            

            var keys = _.pluck(pool, 'key');
            var index = _.indexOf(keys, data.key);
            pool[index] = data;

            console.log(data);

            socket.emit('watchGroup', pool);
        });

    /*
        socket.on('getPosition', function (data) {
            console.log('getPosition');
            console.log(data);
        });
    */
    });   
}




// need to move into api
// individual keys need to be accessible directly from client 
// interfaces need to be data storage agnostic

/* possibly used for api
var request = require('request');
request('/public/example/pool.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
*/

fs.readFile(__dirname + '/public/examples/pool.json', 'utf8', function (err, data) {
  if (err) throw err;

  activateWatchSocket( JSON.parse(data) );
});

/*
var pool = [
        {key:'Kid A'},
        {
            key:'Kid B',
            coords: {
                latitude: 39.0816179,
                longitude: -94.5795273
            },
            timestamp: 1
        },
        {key:'Kid C'}
    ];
*/