import React, { Component } from 'react';
import DeckGL, { ArcLayer } from 'deck.gl';
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
	

	componentDidMount() {
	}

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
						console.log(info.object)
						if (info.object) {
							this.setState({ hoverInfo: info });
						} else {
							this.setState({ hoverInfo: {} })
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

	renderTooltip(info) {
		const { object, x, y } = info;
		
		if (!object) {
			return null;
		}

		return (
			<div className='popup' style={{cursor: 'pointer', position: 'absolute', zIndex: 100, pointerEvents: 'none', left: x + 10, top: y}}>
					<h3>{object.Date}</h3>
					<p>{object.Who} travels to {object.City}, in the riding of <strong>{object.Riding}</strong>. In 2017, the {object.party_incumbent} won this riding by {object.mov} points.</p>
			</div>
		);
	}

	render() {
		return (
			<DeckGL 
				controller={true}
				initialViewState={this.props.viewState}
				layers={this._renderLayers()}
				getTooltup={this.renderTooltip}>

				<StaticMap 
					mapboxApiAccessToken={this.props.accessToken}
					mapStyle={this.props.mapboxStyle}>
				</StaticMap>

				{this.renderTooltip(this.state.hoverInfo)}
			</DeckGL>
		);
	}
}


