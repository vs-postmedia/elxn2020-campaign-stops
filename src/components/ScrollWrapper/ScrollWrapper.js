import React, { Component } from 'react';
import 'intersection-observer';
import Scrollama from 'scrollama';
import ArticleList from '../ArticleList/ArticleList';

import './ScrollWrapper.css';

export class Scrollyteller extends Component {
	componentDidMount() {
		const scroller = Scrollama();

		scroller
			.setup({
				offset: 0.66,
				step: '.step'
			})
			.onStepEnter(resp => this.props.updateGraphic(resp, this.props.articleViews))
			.onStepExit(resp => {

			});

		// setup resize event
		window.addEventListener('resize', scroller.resize);
	}

	togglePointerEvents(index) {
		const container = document.querySelectorAll('.scroll-container');
		if (parseInt(index) === 6) {
			container[0].className += ' no-pointer ';
			// fix graphic to bottom
		} else {
			// container[0].className = 'scroll-container';
		}
	}

	render() {
		return (
			<article id="scroller">
				<ArticleList
					step={this.props.stepValue}
					articleEntries={this.props.articleEntries}
				></ArticleList>
			</article>
		);
	}
}

export default Scrollyteller;