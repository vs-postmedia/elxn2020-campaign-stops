import React from 'react';
import './InputSlider.css';

const InputSlider = (props) => {
	return (
		<input className="input-slider" type="range" 
			step={1} 
			min={1} 
			max={props.sliderMax}
			value={props.value}
			onChange={props.onChange}>
		</input>
	);
};

export default InputSlider;