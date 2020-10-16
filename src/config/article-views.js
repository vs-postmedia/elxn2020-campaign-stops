const center = window.innerWidth > 400 ? [49.28218,-123.496327] : [49.58218,-123.596327];

const views = [
	{
		sliderValue: 22,
		activeButton: 'all',
		viewState: {
			bearing: -20,
			longitude: center[1],
			latitude: center[0],
			maxZoom: 9,
			minZoom: 3,
			pitch: 60,
			transitionDuration: 'auto',
			zoom: 7
		}
	},
	{
		sliderValue: 22,
		activeButton: 'all',
		viewState: {
			bearing: 0.72,
			longitude: -123.0432730329727,
			latitude: 49.1780540598552,
			maxZoom: 9,
			minZoom: 3,
			pitch: 60,
			transitionDuration: 'auto',
			zoom: 9
		}
	},
	{
		sliderValue: 22,
		activeButton: 'furstenau',
		viewState: {
			bearing: 9.8,
			longitude: -123.6166979586502,
			latitude: 48.73956382851505,
			maxZoom: 9,
			minZoom: 3,
			pitch: 50,
			transitionDuration: 'auto',
			zoom: 8.5
		}
	},
	{
		sliderValue: 21,
		activeButton: 'all',
		viewState: {
			bearing: -0.35,
			longitude: -123.34935312214706,
			latitude: 52.597241438637184,
			maxZoom: 9,
			minZoom: 3,
			pitch: 60,
			transitionDuration: 'auto',
			zoom: 4.5
		}
	},
	{
		sliderValue: 21,
		activeButton: 'all',
		viewState: {
			bearing: -8.83,
			longitude: -122.964565510473,
			latitude: 49.217462355344296,
			maxZoom: 9,
			minZoom: 3,
			pitch: 60,
			transitionDuration: 'auto',
			zoom: 9
		}
	},
]

module.exports = views;