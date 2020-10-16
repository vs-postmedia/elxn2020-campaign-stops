import { FlyToInterpolator } from 'deck.gl';
import React, { Fragment } from 'react';
import './MapWrapper.css';

import Map from '../Map/Map';

const MapWrapper = (props) => {
		// set the map view (done when scrolling)
		const view = props.articleView;
		const viewState = view.viewState;
		viewState.transitionInterpolator = new FlyToInterpolator();

		return (
			<Fragment>


				<Map 
					accessToken={props.accessToken}
					data={props.data}
					mapboxStyle={props.mapboxStyle}
					viewState={viewState}
				></Map>
			</Fragment>
		);

}
export default MapWrapper;