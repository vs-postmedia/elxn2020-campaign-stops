import React from 'react';
import './ArticleEntry.css';

const ArticleEntry = (props) => {
	const data = props.data;

	return (
		<li className='step' data-index={data.id}>
			<div className='card'>
				<p dangerouslySetInnerHTML={{__html: data.text}} />
			</div>
		</li>
	);
}

export default ArticleEntry;