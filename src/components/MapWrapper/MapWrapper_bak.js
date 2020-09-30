import React, { Component, Fragment } from 'react';
import * as Turf from '@turf/turf';
import Map from '../Map/Map';
import Papa from 'papaparse';


// VARS
const steps = 500;
const zoom = window.innerWidth > 400 ? 7 : 7;
const center = window.innerWidth > 400 ? [49.008218,-123.496327] : [49.008218,-123.096327];


export default class MapWrapper extends Component {
	arcs = [];
	map_options = {
		center: center,
		container: 'mapview',
		maxZoom: 8,
		minZoom: 3,
		zoom: zoom
	}

	state = {
		data: [],
		filteredData: []
	}

	componentDidMount() {
		Papa.parse(this.props.dataUrl, {
			download: true,
			header: true,
			complete: results => this.handleData(results.data)
		});
	}

	async handleData(data) {
		const routes = await createRoutes(data.filter(d => d.target_id !== ''));

		this.setState({
			data: routes
		});
	}

	render() {
		return (
			<Fragment>
				<Map 
					accessToken={this.props.accessToken}
					center={this.map_options.center}
					container={this.map_options.container}
					data={this.state.data}
					mapboxStyle={this.props.mapboxStyle}
					maxZoom={this.map_options.maxZoom}
					minZoom={this.map_options.minZoom}
					zoom={this.map_options.zoom}
				></Map>
			</Fragment>
		);
	}
}


function createRoutes(data) {
	// split by party
	const groups = [
		data.filter(d => d.Who === 'Furstenau'),
		data.filter(d => d.Who === 'Horgan'),
		data.filter(d => d.Who === 'Wilkinson')
	];
	
	// loop through each party & create geojson
	const routes =  groups.map(group => {

		const route = {
			type: 'FeatureCollection',
			features: []	
		};

		group.forEach(d => {
			const arc = [];
			route.features.push({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[parseFloat(d.source_lon), parseFloat(d.source_lat)],
						[parseFloat(d.target_lon), parseFloat(d.target_lat)]
					]
				},
				properties: {
					city: d.City,
					date: d.Date,
					leader: d.Who,
					mov: d.mov,
					riding_incumbent: d.party_incumbent,
					riding: d.Riding,
					datestamp: d.date
				}
			});

			var line = Turf.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);
			// console.log(JSON.stringify(route.features[0]))
			console.log(route)
			// Calculate the distance in kilometers between route start/end point.
			const lineDistances = route.features.map(d => Turf.length(d));

			// Draw an arc between the `origin` & `destination` of the two points
			for (let i = 0; i < lineDistances; i += lineDistances / steps) {
				const segment = Turf.along(route.features[0], i, 'kilometers');
				arc.push(segment.geometry.coordinates);
			}

			// Update the route with calculated arc coordinates
			route.features.geometry.coordinates = arc;
		});

		return route;
	});

	console.log(routes)
}

function createGeoJSON(data) {
	return {
		type: 'FeatureCollection'
	}
}