const center = window.innerWidth > 400 ? [49.28218,-123.496327] : [49.58218,-123.596327];

const views = [
	{
		sliderValue: 1,
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
		sliderValue: 6,
		activeButton: 'horgan',
		viewState: {
			bearing: -20,
			longitude: -128.607111,
			latitude: 54.591442,
			pitch: 60,
			transitionDuration: 'auto',
			zoom: 6
		}
	},
	{
		sliderValue: 22,
		activeButton: 'furstenau',
		viewState: {
			bearing: -10,
			longitude: center[1],
			latitude: center[0],
			maxZoom: 9,
			minZoom: 3,
			pitch: 50,
			transitionDuration: 'auto',
			zoom: 7
		}
	},
]

module.exports = views;