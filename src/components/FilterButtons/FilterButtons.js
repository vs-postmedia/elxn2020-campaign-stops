import React from 'react';
import './FilterButtons.css';

const FilterButtons = (props) => {
	return (
		<div className="filter-buttons">
			<button onClick={props.onClick} className="btn" id="all" autoFocus>All</button>
			<button onClick={props.onClick} className="btn" id="furstenau">Green</button>
			<button onClick={props.onClick} className="btn" id="horgan">NDP</button>
			<button onClick={props.onClick} className="btn" id="wilkinson">Liberal</button>
		</div>
	);
};

export default FilterButtons;