import React from 'react';
import './ArticleEntry.css';

const ArticleEntry = (props) => {
	let h2;
	const data = props.data;

	if (data.h2) {
		h2 = <h2>{data.h2}</h2>;
	} else {
		h2 = null;
	}

	console.log(h2)

	return (
		<li className='step' data-index={data.id}>
			<div className='card'>
				{h2}
				<p dangerouslySetInnerHTML={{__html: data.text}} />
			</div>
		</li>
	);
}

export default ArticleEntry;