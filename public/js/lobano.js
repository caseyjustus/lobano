$( document ).ready(function() {

	var watchID = navigator.geolocation.watchPosition( function(position) {
		socket.emit('watchPosition', position.coords);

	});

/*

	navigator.compass.getCurrentHeading(function (heading){
		console.log(heading);
	});
*/

	navigator.geolocation.getCurrentPosition(function(position) {

  		console.log(position);
  		$('#mine p.position').text(position);

		socket.emit('getPosition', position.coords);

	});

	var socket = io.connect('http://localhost:3000');

	socket.on('friendsPosition', function (data) {

		console.log(data);

	});

});