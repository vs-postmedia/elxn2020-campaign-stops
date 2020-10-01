import React, { Fragment } from 'react';
import './InputSlider.css';

const InputSlider = (props) => {
	console.log(props)
	return (
		<div className="controls">
			<h2 className="date">{props.currentDate}</h2>
			<input id="input-slider" type="range" 
				defaultValue={props.sliderMax} 
				step={1} 
				min={1} max={props.sliderMax}
				onChange={props.onChange}>
			</input>
		</div>
	);
};

export default InputSlider;