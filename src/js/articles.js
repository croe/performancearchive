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

    let prod = (data.production) ? '/performancearchive/articles/' : '/articles/';
    let path = location.pathname.replace(prod, '');
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

  createMarkup(parag) { return {__html: parag}; };

  render() {
    let detail;
    let tags;
    if (this.props.article.length !== 0) {
      this.props.article.map((item, i) => {
        tags = item.tags.map((tg, j) => {
          let m = _.filter(this.props.tags, function (num) {
            return num.id === tg;
          })
          if(m[0]) {
            let prod = (data.production) ? '/performancearchive/tags/' : '/tags/';
            let link = prod + m[0].slug;
            return (
              <li key={j} className="tag"><Link to={link}>{ m[0].name }</Link></li>
            )
          }
        });
      })
    }

    if (this.state.isLoaded) {
      detail = (
        <div className="inner">
          <h2>
            {this.state.article.title.rendered}
            </h2>
          <div className="head" dangerouslySetInnerHTML={this.createMarkup(this.state.article.acf.video_iframe)} />
          <ol className="tags">{tags}</ol>
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

