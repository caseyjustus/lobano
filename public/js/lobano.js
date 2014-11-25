
var lobano = function(options){

	navigator.geolocation.watchPosition( function(position) {

		position.key = options.myKey;
		position.groupKey = options.groupKey;

		socket.emit('watchPosition', position);

		console.log('position changed');

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
		if (  data !== undefined && options.success){
			var output = [];

			function removeSelf(el, i){
				if (el.key == options.myKey){

					output.push({myPosition: el});

					data.splice(i, 1);

					

				}
			}

			data.forEach(removeSelf);

			output.push({positions: data});


			return options.success(output);

		}else{
			return options.error('error handler');
		}
	});
};

