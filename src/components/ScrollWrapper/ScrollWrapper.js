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
				// this.togglePointerEvents(resp.index);
			});

		// setup resize event
		window.addEventListener('resize', scroller.resize);
	}

	togglePointerEvents(index) {
		const container = document.getElementById('scroller');

		// disable pointer events so we can interact with underlying map
		if (parseInt(index) === this.props.articleEntries.length - 1) {
			container.classList.add('no-pointer');
		} else {
			container.classList.remove('no-pointer');
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