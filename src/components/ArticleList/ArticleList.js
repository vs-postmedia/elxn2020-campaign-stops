import React from 'react';
import ArticleEntry from '../ArticleEntry/ArticleEntry'

const ArticleList = (props) => {
	return (
		<ul>
			{props.articleEntries.map((d,i) => {
				return (
					<ArticleEntry data={d} key={d.id} step={props.step}></ArticleEntry>
				);
			})}
		</ul>
	);
}

export default ArticleList;
