import React, { Fragment } from 'react';
import './FilterButtons.css';

const FilterButtons = (props) => {
	return (
		<div className="filters">
			<div className="inputs">
				<button onClick={props.onClick} className="button" id="all">All</button>
				<button onClick={props.onClick} className="button" id="furstenau">Green</button>
				<button onClick={props.onClick} className="button" id="horgan">NDP</button>
				<button onClick={props.onClick} className="button" id="wilkinson">Liberal</button>
			</div>
		</div>
	);
};

export default FilterButtons;