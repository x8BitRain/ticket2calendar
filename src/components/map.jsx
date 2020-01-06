import React from 'react';
import renderRoute from './renderRoute.js';
import { connect } from 'react-context-global-store';

class Map extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
			lng: 5,
			lat: 34,
			zoom: 2
		};
	}

	componentDidMount() {
		const { origin, destination } = this.props.store.airports;
		console.log('wow');
		console.log(origin, destination);
		renderRoute([origin.lng, origin.lat], [destination.lng, destination.lat]);
	}

	render() {
		return (
				null
		);
	}
}

export default connect(Map, ['airports']);
