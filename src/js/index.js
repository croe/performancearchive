import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import data from './data';
import ArticleList from './components/_articleList';

function attachCustomAttributes(domNode) {
  if (domNode) {
    domNode.setAttribute('playsinline', true);
    domNode.setAttribute('autoplay', true);
    domNode.setAttribute('muted', true);
  }
}

export default class Index extends Component {

	constructor(props) {

		super(props);
		this.state = {
		};
    this.pushMessage = this.pushMessage.bind(this);
	}

	componentWillMount() {

    let scroll = 0;
    $("a[href^='#']").on('click', function () {
      var speed = 500,
        href = $(this).attr("href"),
        target = $(href == "#" || href == "" ? 'html' : href),
        position = target.offset().top;
      $("html, body").animate({scrollTop: position - 40}, speed, "swing");
      return false;
    });
		
	}

	componentWillReceiveProps() {

	}

  pushMessage(){
    this.props.onEventCallBack();
  }

	componentDidMount() {

    $("html, body").animate({scrollTop: 0}, 1);

	}

	render() {
		return (
				<div className="wrap index" id="top">
          <ArticleList
            title={''}
            article={this.props.article}
            tags={this.props.tags}
            page={this.props.page}
            onEventCallBack={this.pushMessage}
          />
				</div>
		)
	}
}