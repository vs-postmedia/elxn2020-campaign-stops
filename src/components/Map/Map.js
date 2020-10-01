import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer, ArcLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import ToolTipTemplate from '../ToolTipTemplate/ToolTipTemplate';

import './Map.css';


export default class Map extends Component {
	map;
	popup;
	// deckgl layers
	layers = [];;
	hoverInfo = {};

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			hoverInfo: {}
		};
	}
	

	componentDidMount() {}

	componentDidUpdate(prevProps, currentProps) {}

	_renderLayers() {
		const layers = [];
		this.props.data.forEach(d => {
			layers.push(
				new ArcLayer({
					id: d.id,
					data: d.data,
					// Styles
					autoHighlight: true,
					getSourcePosition: f => [parseFloat(f.source_lon), parseFloat(f.source_lat)],
					getTargetPosition: f => [parseFloat(f.target_lon), parseFloat(f.target_lat)],
					getSourceColor: d.color,
					getTargetColor: d.color,
					getWidth: 5,
					// interactivity
					pickable: true,
					onHover: info => {
						
						if (info.object) {
							console.log('hover!')
							this.setState({ hoverInfo: info });
							this.hoverInfo = info;
							
						} else {
							console.log('unhover')
							console.log(info.object)
							// this.hoverInfo = {};
						}
					},
					// updates
					updateTriggers: {
						data: [this.props.data]
					}
				})
			);
		});
		return layers;
	}

	setHoverInfo() {
		console.log('viewstatchange')
	}

	render() {
		return (
			<DeckGL 
				controller={true}
				initialViewState={this.props.viewState}
				layers={this._renderLayers()}>

				{this.hoverInfo.object && (
					<div className='popup' style={{cursor: 'pointer', position: 'absolute', zIndex: 100, pointerEvents: 'none', left: this.hoverInfo.x + 10, top: this.hoverInfo.y}}>
							<h3>{this.hoverInfo.object.Date}</h3>
							<p>{this.hoverInfo.object.Who} travels to {this.hoverInfo.object.City}, in the riding of <strong>{this.hoverInfo.object.Riding}</strong>. In 2017, the {this.hoverInfo.object.party_incumbent} won this riding by {this.hoverInfo.object.mov} points.</p>
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



