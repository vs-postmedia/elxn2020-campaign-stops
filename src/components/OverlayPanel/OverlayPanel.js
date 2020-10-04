import React from 'react';
import InputSlider from '../InputSlider/InputSlider';
import FilterButtons from '../FilterButtons/FilterButtons';
import './OverlayPanel.css';

const OverlayPanel = (props) => {
	return (
		<div className="overlay-panel">
			<h2 className="date">{props.currentDate}</h2>
				<InputSlider 
					currentDate={props.currentDate}
					sliderMax={props.sliderMax} 
					value={props.sliderValue}
					onChange={props.onChange}>
				</InputSlider>

			<FilterButtons
				getButtonClass={props.getButtonClass}
				onClick={props.onClick}
			></FilterButtons>
		</div>
	);
};

export default OverlayPanel;