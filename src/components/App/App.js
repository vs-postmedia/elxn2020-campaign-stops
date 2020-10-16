import React from 'react';
import ScrollyMap from '../ScrollyMap/ScrollyMap';

import MapboxConfig from '../../config/mapbox-config';
import ArticleEntries from '../../config/article-entries.json';
import ArticleViews from '../../config/article-views.js';

import './App.css';


// map tiles & attribution
const MapboxStyle = 'mapbox://styles/mapbox/outdoors-v11';
// data
const dataUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/elxn/campaign-stops%20-%20stops.csv';

function App() {
	return (
	  	<div className="App">
	  		<ScrollyMap
	  			articleEntries={ArticleEntries}
	  			articleViews={ArticleViews}
	  			dataUrl={dataUrl}
	  			mapboxStyle={MapboxStyle}
	  			accessToken={MapboxConfig.accessToken}
	  		></ScrollyMap>
	  	</div>
	);
}

export default App;
