import React, { Component, Fragment } from 'react';
import InputSlider from '../InputSlider/InputSlider';
import Map from '../Map/Map';
import Papa from 'papaparse';


// VARS
const zoom = window.innerWidth > 400 ? 7 : 7;
const center = window.innerWidth > 400 ? [49.008218,-123.496327] : [49.008218,-123.096327];


export default class MapWrapper extends Component {
	map_options = {
		// center: center,
		bearing: -20,
		// container: 'mapview',
		longitude: center[1],
		latitude: center[0],
		maxZoom: 8,
		minZoom: 3,
		pitch: 60,
		zoom: zoom
	}

	state = {
		currentDate: '',
		data: [],
		rawData: [],
		sliderMax: 0
	}

	componentDidMount() {
		Papa.parse(this.props.dataUrl, {
			download: true,
			header: true,
			complete: results => this.handleData(results.data)
		});

		// this.animationLoop = this.animationLoop.bind(this);
		this.updateRouteData = this.updateRouteData.bind(this);
	}

	// componentDidUpdate(prevProps, currentProps) {
	// 	console.log(prevProps)
	// 	console.log(currentProps)
	// }

	componentWillUnmount() {
		// window.cancelAnimationFrame(this._frameId);
	}

	// animationLoop() {
	// 	// perform loop work here
	// 	console.log(this._frameId)
	// 	this.updateRouteData();

	// 	// set up next iteration of the loop
	// 	this._frameId = window.requestAnimationFrame(this.animationLoop);
	// }

	handleData(data) {
		// sort by date
		const sorted = data.sort((a,b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
		// get list of dates
		this.dates = [...new Set(sorted.filter(d => d.target_id !== '').map(d => d.Date))];


		// split data into party arrays
		const routes = [{
			id: 'furstenau',
			color: [0,154,68,255],
			data: sorted.filter(d => d.Who === 'Furstenau' && d.target_id !== '')
		}, {
			id: 'horgan',
			color: [253,78,39,255],
			data: sorted.filter(d => d.Who === 'Horgan' && d.target_id !== '')
		}, {
			id: 'wilkinson',
			color: [234,0,58,255],
			data: sorted.filter(d => d.Who === 'Wilkinson' && d.target_id !== '')
		}];

		this.setState({
			// start on the last day
			currentDate: this.dates[this.dates.length - 1],
			data: routes,
			rawData: routes,
			sliderMax: this.dates.length
		});


		// start animation loop
		// this.startLoop();
	}

	// startLoop() {
	// 	console.log('startloop')
	// 	if (!this._frameId) {
	// 		this._frameId = window.requestAnimationFrame(this.animationLoop);
	// 	}
	// }

	updateRouteData(e) {
		const value = e.target.valueAsNumber
		const routes = this.state.rawData.map(d => {
			return {
				id: d.id,
				color: d.color,
				data: d.data.slice(0, value)
			}
		});

		console.log(value)
		console.log(routes)
		this.setState({
			currentDate: routes[0].data[value - 1].Date,
			data: routes
		});
	}


	render() {
		return (
			<Fragment>
			{this.state.sliderMax > 0 && (
				<InputSlider 
					currentDate={this.state.currentDate}
					sliderMax={this.state.sliderMax} 
					onChange={this.updateRouteData}>
					</InputSlider>
			)}
				<Map 
					accessToken={this.props.accessToken}
					data={this.state.data}
					mapboxStyle={this.props.mapboxStyle}
					viewState={this.map_options}
				></Map>
			</Fragment>
		);
	}
}