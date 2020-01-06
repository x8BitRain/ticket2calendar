import mapboxgl from 'mapbox-gl';

const renderRoute = (origin, destination) => {

	let video_container = document.getElementById('video-container');
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGJlbGxidHIiLCJhIjoiY2p5dTF5OXltMDFrOTNjbWxqdjZ5NmV2MCJ9.kkIqnzU12LF90W8yr-jsJw';
	var map = new mapboxgl.Map({
		container: video_container,
		style: 'mapbox://styles/mapbox/light-v10',
		center: [0,0],
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

	var coordinates = route.features[0].geometry.coordinates;

	var bounds = coordinates.reduce(function(bounds, coord) {
		return bounds.extend(coord);
		}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
		 
	map.fitBounds(bounds, {
		padding: 50
	});

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