import React, { Component } from 'react';
import MapboxGL from 'mapbox-gl';
import './Map.css';

export default class Map extends Component {
	map;
	popup;
	arc = [];
	state = {};

	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		const props = this.props;
		// API key
		MapboxGL.accessToken = this.props.accessToken;

		this.map = new MapboxGL.Map({
			center: [props.center[1], props.center[0]],
			container: this.container,
			style: props.mapboxStyle,
			zoom: props.zoom
		});
		console.log(props)
		if (props.data.features) {
			this.renderMap(props.data);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.state.mapIsLoaded) {
			if (this.props.data !== prevProps.data) {
			    this.map.getSource('routes').setData(this.props.data);
			}
		} else {
			this.renderMap(this.props.data);
		}
	}

	renderMap(data) {


		// when the map is ready....
		this.map.on('load', () => {
			// console.log(this.props.data)
			console.log(this.props)
			this.props.data.forEach(d => {
				// add routes
				this.map.addSource('routes', {
					data: d,
					type: 'geojson'
				});

				this.map.addLayer({
					id: 'routes',
					source: 'routes',
					type: 'line',
					layout: {
						'line-cap': 'round',
						'line-join': 'round'
					},
					paint: {
						'line-color': [
							'match',
							['get', 'leader'],
							'Furstenau',
							'Green',
							'Horgan',
							'orange',
							'Wilkinson',
							 'red',
							 // none of the above
							 '#CCC'
						],
						'line-width': 3,
					}
				});
			})


			// Create a popup, but don't add it to the map yet.
			this.popup = new MapboxGL.Popup({
				closeButton: false,
				closeOnClick: false
			});

			// popups for routes
			this.map.on('mouseenter', 'routes', (e) => {
				console.log(e)
				// Change the cursor style as a UI indicator.
				this.map.getCanvas().style.cursor = 'pointer';

				const coordinates = [e.lngLat.lng, e.lngLat.lat];
				const description = e.features[0].properties.leader;

				// Populate the popup and set its coordinates based on the feature found.
				this.popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
			});

			this.map.on('mouseleave', 'routes', () => {
				this.map.getCanvas().style.cursor = '';
				this.popup.remove();
			})
		});

		this.setState({ mapIsLoaded: true });
	}

	render() {
		return (
			<div ref={el => this.container = el} />
		);
	}
}