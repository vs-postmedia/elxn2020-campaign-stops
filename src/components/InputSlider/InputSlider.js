import React, { Fragment } from 'react';
import './InputSlider.css';

const InputSlider = (props) => {
	return (
		<div className="controls">
			<h2 className="date">{props.currentDate}</h2>
			<div className="inputs">
				<button className="play-button">Play</button>
				<input id="input-slider" type="range" 
					defaultValue={props.sliderMax} 
					step={1} 
					min={1} max={props.sliderMax}
					onChange={props.onChange}>
				</input>
			</div>
		</div>
	);
};

export default InputSlider;