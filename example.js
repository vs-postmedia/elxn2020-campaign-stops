import React, { Component } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { scaleThreshold } from "d3-scale";
import ionRangeSlider from "ion-rangeslider";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import data from "./data.json";
// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmdyaWZmaXRocy1wb3N0bWVkaWEiLCJhIjoiY2tmb2x5Zm9wMDNrcDJ0bnZtMnFzbWFveCJ9.dWQATO8gtUhyHuYJNcyr_g' // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
  .domain([
    -0.6,
    -0.45,
    -0.3,
    -0.15,
    0,
    0.15,
    0.3,
    0.45,
    0.6,
    0.75,
    0.9,
    1.05,
    1.2
  ])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [2.0, 0.0, 1.0, 0.0],
  numberOfLights: 2
};

export const INITIAL_VIEW_STATE = {
  latitude: 1.363422,
  longitude: 103.811287,
  zoom: 10,
  maxZoom: 16,
  pitch: 45,
  bearing: 0
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredObject: null, geoJsonValue: "hr01" };
    this.sliderRef = React.createRef();
    this._onHover = this._onHover.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
  }

  componentDidMount() {
    // Code for slider input
    $(this.sliderRef.current).ionRangeSlider({
      min: 0,
      max: 6,
      from: 12,
      step: 1,
      grid: true,
      grid_num: 1,
      grid_snap: true,
      onChange: this._handleChange
    });
  }

  _handleChange = data => {
    this.setState({
      geoJsonValue: `hr0${data.from}`
    });
  };

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.getElevation === getElevation.max) {
      this._stopAnimate();
    } else {
      this.setState({ getElevation: this.state.getElevation + 1 });
    }
  }

  _onHover({ x, y, object }) {
    this.setState({ x, y, hoveredObject: object });
  }

  _renderLayers() {
    const layer = new GeoJsonLayer({
      id: "geojson",
      data,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      fp64: true,
      getElevation: f => f.properties[this.state.geoJsonValue],
      getFillColor: f => COLOR_SCALE(f.properties[this.state.geoJsonValue]),
      getLineColor: [255, 255, 255],
      lightSettings: LIGHT_SETTINGS,
      pickable: true,
      onHover: this._onHover,
      transitions: {
        duration: 300
      },
      updateTriggers: {
        getElevation: [this.state.geoJsonValue],
        getFillColor: [this.state.geoJsonValue]
      }
    });
    return [layer];
  }

  _renderTooltip() {
    const { x, y, hoveredObject } = this.state;
    return (
      hoveredObject && (
        <div className="tooltip" style={{ top: y, left: x }}>
          <div>
            <b>Popup Title Placeholder</b>
          </div>
          <div>
            <div>{hoveredObject.properties.id}</div>
            <div>{hoveredObject.properties.hr00}</div>
            <div>{hoveredObject.properties.hr01}</div>
            <div>{hoveredObject.properties.hr02}</div>
            <div>{hoveredObject.properties.hr03}</div>
            <div>{hoveredObject.properties.hr04}</div>
            <div>{hoveredObject.properties.hr05}</div>
            <div>{hoveredObject.properties.hr06}</div>
          </div>
        </div>
      )
    );
  }

  render() {
    const { viewState, controller = true, baseMap = true } = this.props;

    return (
      <div>
        <h3>{this.state.geoJsonValue}</h3>
        <DeckGL
          layers={this._renderLayers()}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={viewState}
          controller={controller}
        >
          {baseMap && (
            <StaticMap
              reuseMaps
              mapStyle="mapbox://styles/mapbox/dark-v9"
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
          )}

          {this._renderTooltip}
        </DeckGL>

        <div id="sliderstyle">
          <input
            ref={this.sliderRef}
            id="slider"
            class="js-range-slider"
            name="my_range"
          />
        </div>
      </div>
    );
  }
}
