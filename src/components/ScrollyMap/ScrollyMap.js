import Papa from 'papaparse';
import React, { Component, Fragment } from 'react';
import MapWrapper from '../MapWrapper/MapWrapper';
import ScrollWrapper from '../ScrollWrapper/ScrollWrapper';

// import './ScrollyMap.css';

export default class ScrollyMap extends Component {
	dates = [];
	articleViews;
	constructor(props) {
		super(props);

		this.articleViews = this.props.articleViews;
		this.filterButton = this.filterButton.bind(this);
		this.updateGraphic = this.updateGraphic.bind(this);
		this.updateRouteData = this.updateRouteData.bind(this);
	}


	state = {
		activeButton: 'all',
		allData: [],
		currentDateIndex: 0,
		currentView: this.props.articleViews[0],
		currentData: [],
		dataReady: false,
		sliderMax: 0,
		stepValue: 0,
		timestamp: null
	};

	componentDidMount() {
		// download data
		Papa.parse(this.props.dataUrl, {
			download: true,
			header: true,
			complete: results => this.handleData(results.data)
		});
	}
	
	filterButton(e) {
		let data;
		const id = e.target ? e.target.id : e;
		const currentTimestamp = this.state.timestamp;

		// update the active button class
		this.updateButtonClasses(id);

		if (id !== 'all') {
			const partyData = this.state.allData.filter(d => d.id === id);
			data = [{
				id: partyData[0].id,
				color: partyData[0].color,
				data: partyData[0].data.filter(d => d.timestamp <= currentTimestamp)
			}];
		} else {
			data = this.state.allData.map(d => {
				return {
					id: d.id,
					color: d.color,
					data: d.data.filter(d => d.timestamp <= currentTimestamp)
				};
			})
		}

		this.setState({
			currentData: data,
			activeButton: id
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

		// start on the most recent date
		const currentDate = this.dates[this.dates.length - 1];
		
		// we want our mapview to start on the most recent day. This is probably a bit hack-y but...
		this.articleViews[0].sliderValue = this.dates.length;
		this.articleViews[1].sliderValue = this.dates.length;

		this.setState({
			allData: routes,
			currentData: routes,
			currentDate: currentDate,
			// start on the last day
			currentDateIndex: this.dates.length,
			dataReady: true,
			sliderMax: this.dates.length,
			timestamp: this.getTimestamp(currentDate)
		});
	}

	updateButtonClasses(id) {
		const buttons = document.querySelectorAll('.btn');
		buttons.forEach(d => {
			d.id === id ? d.className = 'btn active' : d.className = 'btn';
		});
	}

	updateGraphic(resp) {
		const activeButton = this.articleViews[resp.index].activeButton;

		this.setState({
			activeButton: activeButton,
			currentView: this.articleViews[resp.index],
			stepValue: resp.index
		});

		this.filterButton(activeButton);
		this.updateRouteData(this.articleViews[resp.index].sliderValue);
	}

	updateRouteData(e) {
		let data;
		const value = e.target ? e.target.valueAsNumber : e;
		const currentDate = this.dates[value - 1];
		const activeButton = this.state.activeButton;
		const currentTimestamp = this.getTimestamp(currentDate);

		if (activeButton === 'all') {
			data = this.state.allData;
		} else {
			data = this.state.allData.filter(d => d.id === activeButton);
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
			currentData: routes,
			timestamp: currentTimestamp
		});
	}

	render() {
		return (
			<Fragment>
				<div id="deckgl-map">
					<MapWrapper
						accessToken={this.props.accessToken}
						mapboxStyle={this.props.mapboxStyle}
						articleView={this.state.currentView}
						currentDate={this.state.currentDate}
						currentDateIndex={this.state.currentDateIndex}
						allData={this.state.allData}
						data={this.state.currentData}
						filterButton={this.filterButton}
						sliderMax={this.state.sliderMax}
						stepValue={this.state.stepValue}
						updateRouteData={this.updateRouteData}
						>
					</MapWrapper>
				</div>
				{ this.state.dataReady &&
					<ScrollWrapper
			  			articleEntries={this.props.articleEntries}
			  			articleViews={this.props.articleViews}
			  			dataReady={this.state.dataReady}
			  			step={this.state.stepValue}
			  			updateGraphic={this.updateGraphic}
		  			></ScrollWrapper>
				}
			</Fragment>
		);
	}
}

