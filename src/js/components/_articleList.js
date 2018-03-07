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

    let hash = location.pathname.replace('\/tags\/','');
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

  setDisplayThumb(){
    this.setState({isDisplayToggle: true})
  }

  setDisplayList(){
    this.setState({isDisplayToggle: false})
  }

  render() {
    let posts;
    console.log(this.state.query);
    if (this.props.article.length !== 0) {
      if (this.state.query !== ''){
        let newHash = location.pathname.replace('\/tags\/','');
        posts = this.props.article.map((item,i) => {
          let flag = false;
          let bg = {backgroundImage: 'url('+item.fields.thumbnail +')'};
          let dd = item.date.substring(0,10).split('-');
          let link = '/articles/' + item.id;
          let tags = item.tags.map((tg,j) => {
            let m = _.filter(this.props.tags, function(num){ return num.id === tg;})
            let link = '/tags/' + m[0].name;
            if(_.includes(m[0].name, newHash)){ flag = true }
            return (
              <li key={j} className="tag"><Link to={link}>{ m[0].name }</Link></li>
            )
          });
          if(flag) {
            return (
              <li key={i}>
                <Link to={link}>
                  <div className="list_inner">
                    <div className="head" style={bg}>
                      <p className="date">{dd[0]+'-'+dd[1]+'-'+dd[2]}</p>
                    </div>
                    <div className="desc">
                      <div className="title">
                        <h4>{item.title.rendered}</h4>
                      </div>
                      <div className="content">
                        <p>{item.fields.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <ol className="tags">
                  {tags}
                </ol>
              </li>
            )
          }
        });
        console.log(posts);
      } else {
        posts = this.props.article.map((item,i) => {
          let bg = {backgroundImage: 'url('+item.fields.thumbnail +')'};
          let dd = item.date.substring(0,10).split('-');
          let tags = item.tags.map((tg,j) => {
            let m = _.filter(this.props.tags, function(num){ return num.id === tg;})
            let link = '/performancearchive/tags/' + m[0].name;
            return (
              <li key={j} className="tag"><Link to={link}>{ m[0].name }</Link></li>
            )
          });
          let link = '/articles/' + item.id;
          return (
            <li key={i}>
              <Link to={link}>
                <div className="list_inner">
                  <div className="head" style={bg}>
                    <p className="date">{dd[0]+'-'+dd[1]+'-'+dd[2]}</p>
                  </div>
                  <div className="desc">
                    <div className="title">
                      <h4>{item.title.rendered}</h4>
                    </div>
                    <div className="content">
                      <p>{item.fields.description}</p>
                    </div>
                  </div>
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
          <div className="change">
            <p>表示きりかえ</p>
            <button className="thumb" onClick={this.setDisplayThumb} />
            <button className="list" onClick={this.setDisplayList} />
          </div>
          <ul className={displayToggle}>
            { posts }
          </ul>
          {/*<button id="getmore" className="more" onClick={this.getMoreArticle}>もっと見る</button>*/}
        </div>
      </section>
    )
  }
}
