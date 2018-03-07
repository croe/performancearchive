/**
 * Created by Akihiro-Kato on 2017/03/31.
 */

import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';

import data from './data';

import ArticleList from './components/_articleList';

export default class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      article: {}
    }
  }

  componentWillMount() {

    let it = this;

    let path = location.pathname.replace('/articles/', '');
    $.ajax({
      url: data.paths[0].POSTS_URL + path,
      dataType: 'json'
    }).done(function (data) {
      it.setState({
        article: data,
        isLoaded: true
      });
    });
  }

  componentDidMount() {
    $("html, body").animate({scrollTop: 0}, 1);
  }

  render() {
    let detail;
    if (this.state.isLoaded) {
      let dd = this.state.article.date.substring(0,10).split('-');
      detail = (
        <div className="inner">
          <h2>
            <span>{dd[0]+'-'+dd[1]+'-'+dd[2]}</span>
            {this.state.article.title.rendered}
            </h2>
          <div className="head">
            <img src={this.state.article.fields.thumbnail}/>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html: this.state.article.content.rendered}} />
        </div>

      )
    }

    return (
      <div className="wrap article">
        <section className="article_detail">
          {detail}
        </section>
      </div>
    )
  }


}

