
var lobano = function(options){

	var output = new Object;

	navigator.geolocation.watchPosition( function(position) {

		position.key = options.myKey;
		position.groupKey = options.groupKey;

		output.myPosition = position;

		socket.emit('watchPosition', position);

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

			var myIndex;

			function setPositions(el, i){

				if (el.key == options.myKey){

					myIndex = i;
					
				}else{

					if (el.coords){

						var myLatLon = new LatLon(output.myPosition.coords.latitude, output.myPosition.coords.longitude);
						var otherLatLon = new LatLon(el.coords.latitude, el.coords.longitude);

						data[i].coords.distance = myLatLon.distanceTo(otherLatLon);	
						data[i].coords.direction = myLatLon.bearingTo(otherLatLon);	
											
					}
				}
			}
			
			data.forEach(setPositions);

			data.splice(myIndex, 1);

			output.groupPositions = data;

			return options.success(output);

		}else{

			return options.error('error handler');

		}
	});
};

