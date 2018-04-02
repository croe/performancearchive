/**
 * Created by Akihiro-Kato on 2017/03/31.
 */

import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';

import data from './data';

import ArticleList from './components/_articleList';

export default class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.pushMessage = this.pushMessage.bind(this);
  }

  componentDidMount() {
    $("html, body").animate({scrollTop: 0}, 1);
  }

  pushMessage(){
    this.props.onEventCallBack();
  }

  render() {
    let title;
    if (this.props.tags){
      title = this.props.tags.map((item, i) => {
        if (item.slug === this.props.routeParams.tag) {
          return item.name;
        }
      })
    }
    return (
      <div className="wrap tags">
        <ArticleList
          title={title}
          article={this.props.article}
          tags={this.props.tags}
          page={this.props.page}
          onEventCallBack={this.pushMessage}
        />
      </div>
    )
  }


}

