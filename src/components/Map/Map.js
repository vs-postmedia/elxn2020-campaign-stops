import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer, ArcLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
// import MapboxGL from 'mapbox-gl';

import './Map.css';

// const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';


// const onClick = info => {
// 	if (info.object) {
// 	    // eslint-disable-next-line
// 	    alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
// 	}
// };

export default class Map extends Component {
	map;
	popup;
	layers;

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			hoverInfo: {}
		};

		// this.sliderRef = React.createRef();
	}
	layers = [];

	componentDidMount() {
		// this.props.data.forEach(d => {
		// 	this.layers.push(
		// 		new ArcLayer({
		// 			id: d.id,
		// 			// data: d.data,
		// 			data: this.state.data,
		// 			pickable: true,
		// 			// Styles
		// 			autoHighlight: true,
		// 			getSourcePosition: f => [parseFloat(f.source_lon), parseFloat(f.source_lat)],
		// 			getTargetPosition: f => [parseFloat(f.target_lon), parseFloat(f.target_lat)],
		// 			getSourceColor: d.color,
		// 			getTargetColor: d.color,
		// 			getWidth: 5,
		// 			// update tooltip
		// 			onHover: info => {
		// 				if (info.object) {
		// 					this.setState({ hoverInfo: info });
		// 				}
		// 			},
		// 			// updates
		// 			updateTriggers: {
		// 				data: [this.state.data]
		// 			}
		// 		})
		// 	);
		// });

		// this.setState({ data: this.props.data });
		// this.state.layers = [
		// 	new GeoJsonLayer({
		// 		id: 'airports',
		// 		data: AIR_PORTS,
		// 		// Styles
		// 		filled: true,
		// 		pointRadiusMinPixels: 2,
		// 		pointRadiusScale: 2000,
		// 		getRadius: f => 11 - f.properties.scalerank,
		// 		getFillColor: [200, 0, 80, 180],
		// 		// Interactive props
		// 		pickable: true,
		// 		autoHighlight: true,
		// 		onClick
		// 	})
		// ];
	}

	componentDidUpdate(prevProps, currentProps) {
		// console.log(prevProps)
		// console.log(currentProps)
	}

	_renderLayers() {
		// console.log('render')
		// console.log(this.props.data)
		const layers = [];
		this.props.data.forEach(d => {
			layers.push(
				new ArcLayer({
					id: d.id,
					data: d.data,
					pickable: true,
					// Styles
					autoHighlight: true,
					getSourcePosition: f => [parseFloat(f.source_lon), parseFloat(f.source_lat)],
					getTargetPosition: f => [parseFloat(f.target_lon), parseFloat(f.target_lat)],
					getSourceColor: d.color,
					getTargetColor: d.color,
					getWidth: 5,
					// update tooltip
					onHover: info => {
						if (info.object) {
							this.setState({ hoverInfo: info });
						}
					},
					// updates
					updateTriggers: {
						data: [this.props.data]
					}
				})
			);
		});
		// console.log(layers)
		return layers;
	}

	progressArcs(layer, coef) {
		layer.setProps({coef});
	}

	animateArcs(layer) {
		let coef = 0.001;
		const animationInterval = setInterval(() => {
			coef += 0.005;
			if (coef >= 1.0) {
				clearInterval(animationInterval);
			}
			layer.setProps({coef});
		}, 5);
	}


	render() {
		return (
			// <div ref={el => this.container = el} />
			<DeckGL 
				controller={true}
				initialViewState={this.props.viewState}
				layers={this._renderLayers()}>
				{this.state.hoverInfo.object && (
					<div className='popup' style={{position: 'absolute', zIndex: 100, pointerEvents: 'none', left: this.state.hoverInfo.x + 10, top: this.state.hoverInfo.y}}>
							<p>{this.state.hoverInfo.object.Riding}</p>
							<p>{this.state.hoverInfo.object.Date}</p>
					</div>
				)}
				<StaticMap 
					mapboxApiAccessToken={this.props.accessToken}
					mapStyle={this.props.mapboxStyle}>
				</StaticMap>
			</DeckGL>
		);
	}
}




