import mapboxgl from 'mapbox-gl';

const renderRoute = (origin, destination) => {
	console.log("ORIGIN: \n" + origin);
	console.log("DESTINATION: \n" + destination);


	var midPoint = function(latitude1, longitude1, latitude2, longitude2) {
	  var DEG_TO_RAD = Math.PI / 180;     // To convert degrees to radians.

	  // Convert latitude and longitudes to radians:
	  var lat1 = latitude1 * DEG_TO_RAD;
	  var lat2 = latitude2 * DEG_TO_RAD;
	  var lng1 = longitude1 * DEG_TO_RAD;
	  var dLng = (longitude2 - longitude1) * DEG_TO_RAD;  // Diff in longtitude.

	  // Calculate mid-point:
	  var bx = Math.cos(lat2) * Math.cos(dLng);
	  var by = Math.cos(lat2) * Math.sin(dLng);
	  var lat = Math.atan2(
	      Math.sin(lat1) + Math.sin(lat2),
	      Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + by * by));
	  var lng = lng1 + Math.atan2(by, Math.cos(lat1) + bx);

	  return ([lat / DEG_TO_RAD, lng / DEG_TO_RAD]);
	};



	let video_container = document.getElementById('video-container');
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGJlbGxidHIiLCJhIjoiY2p5dTF5OXltMDFrOTNjbWxqdjZ5NmV2MCJ9.kkIqnzU12LF90W8yr-jsJw';
	var map = new mapboxgl.Map({
		container: video_container,
		style: 'mapbox://styles/mapbox/light-v10',
		center: midPoint(origin[0],origin[1],destination[0],destination[1]),
		zoom: 4
	});

	// A simple line from origin to destination.
	var route = {
		'type': 'FeatureCollection',
		'features': [{
			'type': 'Feature',
			'geometry': {
				'type': 'LineString',
				'coordinates': [origin, destination]
			}
		}]
	};

	// A single point that animates along the route.
	// Coordinates are initially set to origin.
	var point = {
		'type': 'FeatureCollection',
		'features': [{
			'type': 'Feature',
			'properties': {},
			'geometry': {
				'type': 'Point',
				'coordinates': origin
			}
		}]
	};



	map.on('load', function() {
		// Add a source and layer displaying a point which will be animated in a circle.
		map.addSource('route', {
			'type': 'geojson',
			'data': route
		});

		map.addSource('point', {
			'type': 'geojson',
			'data': point
		});

		map.addLayer({
			'id': 'route',
			'source': 'route',
			'type': 'line',
			'paint': {
				'line-width': 2,
				'line-color': '#007cbf'
			}
		});

		map.addLayer({
			'id': 'point',
			'source': 'point',
			'type': 'symbol',
			'layout': {
				'icon-image': 'airport-15',
				'icon-rotate': ['get', 'bearing'],
				'icon-rotation-alignment': 'map',
				'icon-allow-overlap': true,
				'icon-ignore-placement': true
			}
		});

	});
}

export default renderRoute;