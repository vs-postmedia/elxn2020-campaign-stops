import React from 'react';
import './ArticleEntry.css';

const ArticleEntry = (props) => {
	const data = props.data;

	return (
		<li className='step' data-index={data.id}>
			<p>{data.text}</p>
			<h1>{props.step}</h1>
		</li>
	);
}

export default ArticleEntry;