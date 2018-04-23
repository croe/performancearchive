/**
 * Created by Akihiro-Kato on 2017/03/20.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';
import _ from 'lodash';
import Measure from 'react-measure';
import ClassNames from 'classnames';

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
      dimensions: {
        width: -1,
        height: -1
      }
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
    }

  }

  componentDidMount(){

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

  createMarkup(parag) {
    return {__html: parag};
  };

  render() {
    const { width, height } = this.state.dimensions;
    let style;
    let posts;
    if (this.props.article.length !== 0) {
      console.log(this.state.query)
      if (this.state.query !== '\/performancearchive\/') {
        let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
        let newHash = location.pathname.replace(prod, '');
        posts = this.props.article.map((item, i) => {
          let prod2 = data.production ? '/performancearchive/articles/' : '/articles/'
          let link = prod2 + item.id;
          let tag = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {return num.id === tg;})
            return _.includes(m[0].slug, newHash)
          });
          let title = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'title') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          // let yop = item.tags.map((tg, j) => {
          //   let m = _.filter(this.props.tags, function (num) {
          //     return num.id === tg;
          //   })
          //   let t = m[0];
          //   if (t && $.parseJSON(t.description).category === 'yop') {
          //     let obj = $.parseJSON(t.description);
          //     let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
          //     let link = prod + t.slug;
          //     let name = this.props.langEn ? obj.name_en : obj.name_ja;
          //     return (
          //       <li key={j}><Link to={link}>{name}</Link></li>
          //     )
          //   }
          // })
          let artists = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'artist') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          let performer = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'performer') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          let record = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'record') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          style = (this.state.dimensions.right < 736)
            ? {height: (this.state.dimensions.width) * (9 / 16)}
            : {height: (this.state.dimensions.width / 3) * (9 / 16)}
          if (_.includes(tag, true)){
            return (
              <li key={i}>
                <Link to={link}>
                  <div className="list_inner">
                    <div
                      dangerouslySetInnerHTML={this.createMarkup(item.acf.video_iframe)}
                      style={style}
                    />
                  </div>
                </Link>
                <div className="tags">
                  <ul className="tag_title">{title}</ul>
                  {/*<ul className="tag_yop">{yop}</ul>*/}
                  <ul className="tag_artist">
                    {artists}
                  </ul>
                  <ul className="tag_performer">
                    {performer}
                  </ul>
                  <ul className="tag_record">
                    {record}
                  </ul>
                </div>
              </li>
            )
          }
        });
      } else {
        posts = this.props.article.map((item, i) => {
          let title = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'title') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          // let yop = item.tags.map((tg, j) => {
          //   let m = _.filter(this.props.tags, function (num) {
          //     return num.id === tg;
          //   })
          //   let t = m[0];
          //   if (t && $.parseJSON(t.description).category === 'yop') {
          //     let obj = $.parseJSON(t.description);
          //     let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
          //     let link = prod + t.slug;
          //     let name = this.props.langEn ? obj.name_en : obj.name_ja;
          //     return (
          //       <li key={j}><Link to={link}>{name}</Link></li>
          //     )
          //   }
          // })
          let artists = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'artist') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          let performer = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'performer') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          let record = item.tags.map((tg, j) => {
            let m = _.filter(this.props.tags, function (num) {
              return num.id === tg;
            })
            let t = m[0];
            if (t && $.parseJSON(t.description).category === 'record') {
              let obj = $.parseJSON(t.description);
              let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
              let link = prod + t.slug;
              let name = this.props.langEn ? obj.name_en : obj.name_ja;
              return (
                <li key={j}><Link to={link}>{name}</Link></li>
              )
            }
          })
          let prod2 = data.production ? '/performancearchive/articles/' : '/articles/'
          let link = prod2 + item.id;
          style = (this.state.dimensions.right < 736)
            ? {height: (this.state.dimensions.width) * (9 / 16)}
            : {height: (this.state.dimensions.width / 3) * (9 / 16)}
          return (
            <li key={i}>
              <Link to={link}>
                <div className="list_inner">
                  <div
                    dangerouslySetInnerHTML={this.createMarkup(item.acf.video_iframe)}
                    style={style}
                  />
                </div>
              </Link>
              <div className="tags">
                <ul className="tag_title">{title}</ul>
                {/*<ul className="tag_yop">{yop}</ul>*/}
                <ul className="tag_artist">
                  {artists}
                </ul>
                <ul className="tag_performer">
                  {performer}
                </ul>
                <ul className="tag_record">
                  {record}
                </ul>
              </div>
            </li>
          )
        });
      }
    }
    let displayToggle = this.state.isDisplayToggle ? 'disp_thumb' : 'disp_list';

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds })
        }}
      >
        {({measureRef}) =>
          <section className="article_list" ref={measureRef}>
            <div className="inner">
              <h2>{this.props.title}</h2>
              {/*<div className="change">*/}
              {/*<p>表示きりかえ</p>*/}
              {/*<button className="thumb" onClick={this.setDisplayThumb}/>*/}
              {/*<button className="list" onClick={this.setDisplayList}/>*/}
              {/*</div>*/}
              <ul className={displayToggle}>
                {posts}
              </ul>
              {/*<button id="getmore" className="more" onClick={this.getMoreArticle}>もっと見る</button>*/}
            </div>
          </section>
        }
      </Measure>
    )
  }
}
