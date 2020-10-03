import React, { Component, Fragment } from 'react';
import OverlayPanel from '../OverlayPanel/OverlayPanel';
import InputSlider from '../InputSlider/InputSlider';
import FilterButtons from '../FilterButtons/FilterButtons';
import Map from '../Map/Map';
import Papa from 'papaparse';


// VARS
const zoom = window.innerWidth > 400 ? 7 : 7;
const center = window.innerWidth > 400 ? [49.28218,-123.496327] : [49.58218,-123.596327];


export default class MapWrapper extends Component {
	dates = [];
	map_options = {
		bearing: -20,
		longitude: center[1],
		latitude: center[0],
		maxZoom: 9,
		minZoom: 3,
		pitch: 60,
		zoom: zoom
	}

	state = {
		currentDate: '',
		currentDateIndex: 0,
		data: [],
		partyFilter: 'all',
		rawData: [],
		sliderMax: 0,
		timestamp: 0
	}

	componentDidMount() {
		Papa.parse(this.props.dataUrl, {
			download: true,
			header: true,
			complete: results => this.handleData(results.data)
		});

		this.filterButton = this.filterButton.bind(this);
		this.updateRouteData = this.updateRouteData.bind(this);
	}

	// componentDidUpdate(prevProps, currentProps) {
	// 	console.log(prevProps)
	// 	console.log(currentProps)
	// }

	// animationLoop() {
	// 	// perform loop work here
	// 	console.log(this._frameId)
	// 	this.updateRouteData();

	// 	// set up next iteration of the loop
	// 	this._frameId = window.requestAnimationFrame(this.animationLoop);
	// }
	filterButton(e) {
		let data;
		const id = e.target.id;
		const currentTimestamp = this.state.timestamp;

		if (id !== 'all') {
			const partyData = this.state.rawData.filter(d => d.id === id);
			data = [{
				id: partyData[0].id,
				color: partyData[0].color,
				data: partyData[0].data.filter(d => d.timestamp <= currentTimestamp)
			}];
			
		} else {
			data = this.state.rawData.map(d => {
				return {
					id: d.id,
					color: d.color,
					data: d.data.filter(d => d.timestamp <= currentTimestamp)
				};
			})
		}

		this.setState({
			data: data,
			partyFilter: id
		});
	}
	getTimestamp(currentDate) {
		return new Date(`${currentDate.split('.')[1]} ${currentDate.split('.')[0]} 2020`);
	}

	handleData(data) {
		// sort by date
		const sorted = data
			.map(d => {
				d.timestamp = new Date(d.date).getTime()
				return d;
			})
			.sort((a,b) => {
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

		const currentDate = this.dates[this.dates.length - 1];
		this.setState({
			// start on the last day
			currentDate: currentDate,
			currentDateIndex: this.dates.length,
			data: routes,
			rawData: routes,
			sliderMax: this.dates.length,
			timestamp: this.getTimestamp(currentDate)
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
		const currentDate = this.dates[value - 1];
		const partyFilter = this.state.partyFilter;
		const currentTimestamp = this.getTimestamp(currentDate);

		if (partyFilter === 'all') {
			data = this.state.rawData;
		} else {
			data = this.state.rawData.filter(d => d.id === partyFilter);
		}

		// filter data by date
		const routes = data.map(d => {
			return {
				id: d.id,
				color: d.color,
				data: d.data.filter(d => d.timestamp <= currentTimestamp)
			}
		});

		this.setState({
			currentDate: currentDate,
			currentDateIndex: value,
			data: routes,
			timestamp: currentTimestamp
		});
	}


	render() {
		return (
			<Fragment>
				<OverlayPanel
					onClick={this.filterButton}
					currentDate={this.state.currentDate}
					sliderMax={this.state.sliderMax} 
					sliderValue={this.state.currentDateIndex}
					onChange={this.updateRouteData}
				></OverlayPanel>

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
/*
{this.state.sliderMax > 0 && (
	<InputSlider 
		currentDate={this.state.currentDate}
		sliderMax={this.state.sliderMax} 
		value={this.state.currentDateIndex}
		onChange={this.updateRouteData}>
		</InputSlider>
)}
<FilterButtons
	onClick={this.filterButton}
></FilterButtons>
*/