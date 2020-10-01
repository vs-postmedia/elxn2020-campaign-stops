import React, { Component, Fragment } from 'react';
import InputSlider from '../InputSlider/InputSlider';
import FilterButtons from '../FilterButtons/FilterButtons';
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
		partyFilter: 'all',
		rawData: [],
		sliderMax: 0
	}

	componentDidMount() {
		Papa.parse(this.props.dataUrl, {
			download: true,
			header: true,
			complete: results => this.handleData(results.data)
		});

		this.filterData = this.filterData.bind(this);
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
	filterData(e) {
		let data;
		const id = e.target.id;

		if (id !== 'all') {
			data = this.state.rawData.filter(d => d.id === id);
		} else {
			data = this.state.rawData;
		}

		this.setState({
			data: data,
			partyFilter: id
		});
	}

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
		let data;
		const value = e.target.valueAsNumber
		const partyFilter = this.state.partyFilter;

		if (partyFilter === 'all') {
			data = this.state.rawData;
		} else {
			data = this.state.rawData.filter(d => d.id === partyFilter);
		}

		const routes = data.map(d => {
			return {
				id: d.id,
				color: d.color,
				data: d.data.slice(0, value)
			}
		});

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
				<FilterButtons
					onClick={this.filterData}
				></FilterButtons>
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