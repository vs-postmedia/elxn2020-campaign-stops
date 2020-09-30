import React, { Component, Fragment } from 'react';
import * as Turf from '@turf/turf';
import Map from '../Map/Map';
import Papa from 'papaparse';


// VARS
const steps = 500;
const zoom = window.innerWidth > 400 ? 7 : 7;
const center = window.innerWidth > 400 ? [49.008218,-123.496327] : [49.008218,-123.096327];


export default class MapWrapper extends Component {
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
		const routes = [];
		// split data into party arrays
		const groups = [
			data.filter(d => d.Who === 'Furstenau' && d.target_id !== ''),
			data.filter(d => d.Who === 'Horgan' && d.target_id !== ''),
			// data.filter(d => d.Who === 'Wilkinson' && d.target_id !== '')
		];

		routes.push(await parseRoutes(groups));
		console.log(routes)
		// const routes = await parseRoutes(groups.filter(d => d.target_id !== ''));

		// Calculate the distance in kilometers between route start/end point.
		// const lineDistances = routes.features.map(d => {
		// 	// console.log(d)
		// 	Turf.length(d);
		// });

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

function parseRoutes(data) {
	const group = [];
	
	const routes = {
		type: 'FeatureCollection',
		features: []
	};

	console.log(data)
	data.forEach(route => {
		route.forEach(d => {
			routes.features.push(Turf.greatCircle(
				[parseFloat(d.source_lon), parseFloat(d.source_lat)], 
				[parseFloat(d.target_lon), parseFloat(d.target_lat)],
				{
					properties: {
						city: d.City,
						date: d.Date,
						leader: d.Who,
						mov: d.mov,
						party: d.party_incumbent,
						riding: d.Riding,
						datestamp: d.date
					}
				}
			));
	})
	// data[0].forEach(d => {
	// 	// const arcs = [];
	// 	routes.features.push(Turf.greatCircle(
	// 		[parseFloat(d.source_lon), parseFloat(d.source_lat)], 
	// 		[parseFloat(d.target_lon), parseFloat(d.target_lat)],
	// 		{
	// 			properties: {
	// 				city: d.City,
	// 				date: d.Date,
	// 				leader: d.Who,
	// 				mov: d.mov,
	// 				party: d.party_incumbent,
	// 				riding: d.Riding,
	// 				datestamp: d.date
	// 			}
	// 		}
	// 	));
		
		// const route = {
		// 	type: 'Feature',
		// 	geometry: {
		// 		type: 'LineString',
		// 		coordinates: [
		// 			[parseFloat(d.source_lon), parseFloat(d.source_lat)],
		// 			
		// 		]
		// 	},
		// 	properties: {
		// 		city: d.city,
		// 		date: d.Date,
		// 		leader: d.Who,
		// 		mov: d.mov,
		// 		party: d.party_incumbent,
		// 		riding: d.Riding,
		// 		datestamp: d.date
		// 	}
		// };
		// var line = Turf.lineString([[115, -32], [131, -22]]);

	});

	return routes;
}

function createGeoJSON(data) {
	return {
		type: 'FeatureCollection'
	}
}