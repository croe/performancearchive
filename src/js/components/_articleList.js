/**
 * Created by Akihiro-Kato on 2017/03/20.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';
import _ from 'lodash';

import data from '../data';

export default class ArticleList extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isHidden: true,
      postsData: '',
      date: '',
      query: '',
      catname: '',
      isDisplayToggle: true,
      pageCount: this.props.page,
    };
    this.getMoreArticle = this.getMoreArticle.bind(this);
    this.setDisplayList = this.setDisplayList.bind(this);
    this.setDisplayThumb = this.setDisplayThumb.bind(this);

  }

  componentWillMount() {

    let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
    let hash = location.pathname.replace(prod, '');
    if (hash !== '\/') {
      this.setState({
        query: hash
      })
      console.log(this.state.query);
    }

    console.log(this.state.pageCount)

  }

  getMoreArticle() {
    this.props.onEventCallBack();
  }

  setDisplayThumb() {
    this.setState({isDisplayToggle: true})
  }

  setDisplayList() {
    this.setState({isDisplayToggle: false})
  }

  createMarkup(parag) { return {__html: parag}; };

  render() {
    let posts;
    console.log(this.state.query);
    if (this.props.article.length !== 0) {
      if (this.state.query !== ''){
        let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
        let newHash = location.pathname.replace(prod,'');
        posts = this.props.article.map((item,i) => {
          let flag = false;
          let prod2 = data.production ? '/performancearchive/articles/' : '/articles/'
          let link = prod2 + item.id;
          let tags = item.tags.map((tg,j) => {
            let m = _.filter(this.props.tags, function(num){ return num.id === tg;})
            console.log(m[0])
            let prod3 = data.production ? '/performancearchive/tags/' : '/tags/';
            let link = prod3 + m[0].slug;
            if(_.includes(m[0].slug, newHash)){ flag = true }
            return (
              <li key={j} className="tag"><Link to={link}>{ m[0].name }</Link></li>
            )
          });
          if(flag) {
            return (
              <li key={i}>
                <Link to={link}>
                  <div className="list_inner">
                    <div dangerouslySetInnerHTML={this.createMarkup(item.acf.video_iframe)}></div>
                  </div>
                </Link>
                <ol className="tags">
                  {tags}
                </ol>
              </li>
            )
          }
        });
      } else {
        posts = this.props.article.map((item, i) => {
          let tags = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            if(m[0]) {
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + m[0].slug;
              return (
                <li key={j} className="tag"><Link to={link}>{ m[0].name }</Link></li>
              )
            }
          });
          let prod2 = data.production ? '/performancearchive/articles/' : '/articles/'
          let link = prod2 + item.id;
          return (
            <li key={i}>
              <Link to={link}>
                <div className="list_inner">
                  <div dangerouslySetInnerHTML={this.createMarkup(item.acf.video_iframe)}></div>
                </div>
              </Link>
              <ol className="tags">
                {tags}
              </ol>
            </li>
          )
        });
      }
    }
    let displayToggle = this.state.isDisplayToggle ? 'disp_thumb' : 'disp_list';
    return (
      <section className="article_list">
        <div className="inner">
          <h2>{this.props.title}</h2>
          {/*<div className="change">*/}
            {/*<p>表示きりかえ</p>*/}
            {/*<button className="thumb" onClick={this.setDisplayThumb}/>*/}
            {/*<button className="list" onClick={this.setDisplayList}/>*/}
          {/*</div>*/}
          <ul className={displayToggle}>
            { posts }
          </ul>
          {/*<button id="getmore" className="more" onClick={this.getMoreArticle}>もっと見る</button>*/}
        </div>
      </section>
    )
  }
}
