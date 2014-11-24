

var myKey = 42



var watchID = navigator.geolocation.watchPosition( function(position) {

	position.key = myKey;

	socket.emit('watchPosition', position);

	//console.log('position changed');
	//console.log(position);

});


/*
	navigator.compass.getCurrentHeading(function (heading){
		console.log(heading);
	});
*/
/*
	navigator.geolocation.getCurrentPosition(function(position) {

  		console.log(position);
  		$('#mine p.position').text(position);

		socket.emit('getPosition', position.coords);

	});
*/

var socket = io.connect('http://localhost:3000');

socket.on('watchGroup', function (data) {

	console.log(data);

});

