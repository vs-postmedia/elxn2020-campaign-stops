import React from 'react';
import MapWrapper from '../MapWrapper/MapWrapper';
import MapboxConfig from '../../config/mapbox-config';
import './App.css';


// map tiles & attribution
const mapboxStyle = 'mapbox://styles/mapbox/outdoors-v11';
// data
const dataUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/elxn/campaign-stops%20-%20stops.csv';


function App() {
	return (
	  	<div className="App">
	  		<h1>Campaign Stop Tracker</h1>
	  		<MapWrapper
	  			dataUrl={dataUrl}
	  			mapboxStyle={mapboxStyle}
	  			accessToken={MapboxConfig.accessToken}>
	  		</MapWrapper>
	  	</div>
	);
}

export default App;
