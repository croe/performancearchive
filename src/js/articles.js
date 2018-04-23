/**
 * Created by Akihiro-Kato on 2017/03/31.
 */

import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';
import Measure from 'react-measure';

import data from './data';

import ArticleList from './components/_articleList';
import _ from "lodash";

export default class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      article: {},
      dimensions: {
        width: -1,
        height: -1
      }
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

  createMarkup(parag) {
    return {__html: parag};
  };

  render() {
    let detail;
    let title;
    let artists;
    let performer;
    let yor;
    let yop;
    let record;
    let venue;
    let moreinfo;


    if (this.state.isLoaded) {
      if (this.state.article.length !== 0) {
        title = this.state.article.tags.map((tg, j) => {
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
              <Link to={link}>{name}</Link>
            )
          }
        })
        yop = this.state.article.tags.map((tg, j) => {
          let m = _.filter(this.props.tags, function (num) {
            return num.id === tg;
          })
          let t = m[0];
          if (t && $.parseJSON(t.description).category === 'yop') {
            let obj = $.parseJSON(t.description);
            let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
            let link = prod + t.slug;
            let name = this.props.langEn ? obj.name_en : obj.name_ja;
            return (
              <Link to={link}>{name}</Link>
            )
          }
        })
        yor = this.state.article.tags.map((tg, j) => {
          let m = _.filter(this.props.tags, function (num) {
            return num.id === tg;
          })
          let t = m[0];
          if (t && $.parseJSON(t.description).category === 'yor') {
            let obj = $.parseJSON(t.description);
            let prod = (data.production) ? '\/performancearchive\/tags\/' : '\/tags\/'
            let link = prod + t.slug;
            let name = this.props.langEn ? obj.name_en : obj.name_ja;
            return (
              <Link to={link}>{name}</Link>
            )
          }
        })
        artists = this.state.article.tags.map((tg, j) => {
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
        performer = this.state.article.tags.map((tg, j) => {
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
        record = this.state.article.tags.map((tg, j) => {
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
      }
      venue = this.props.langEn
        ? this.state.article.acf.venue_en
        : this.state.article.acf.venue_ja;
      moreinfo = this.props.langEn
        ? this.state.article.acf.moreinfo_en
        : this.state.article.acf.moreinfo_ja;
      detail = (
        <div className="inner">
          <h2>{title}</h2>
          <div
            className="head"
            dangerouslySetInnerHTML={this.createMarkup(this.state.article.acf.video_iframe)}
            style={{height: this.state.dimensions.width * (9/16)}}
          />
          <div className="infomations">
            <div>
              <div className="tag_title">
                <h3>Title</h3>
                <p>{title}</p>
              </div>
              <div className="tag_artist">
                <h3>Artist</h3>
                <ul>{artists}</ul>
              </div>
              <div className="tag_performer">
                <h3>Performer/Collaborator</h3>
                <ul>{performer}</ul>
              </div>
            </div>
            <div>
              <div className="tag_yor">
                <h3>Year of Recording</h3>
                <p>{yor}</p>
              </div>
              <div className="info_venue">
                <h3>Venue</h3>
                <p>{venue}</p>
              </div>
              <div className="info_duration">
                <h3>Duration</h3>
                <p>{this.state.article.acf.duration}</p>
              </div>
              <div className="tag_yop">
                <h3>Year of Production</h3>
                <p>{yop}</p>
              </div>
              <div className="tag_record">
                <h3>Recording Director</h3>
                <ul>{record}</ul>
              </div>
              <div className="info_more">
                <h3>More info</h3>
                <div dangerouslySetInnerHTML={this.createMarkup(moreinfo)} />
              </div>
            </div>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html: this.state.article.content.rendered}}/>
        </div>

      )
    }

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({dimensions: contentRect.bounds})
        }}
      >
        {({measureRef}) =>
          <div className="wrap article" ref={measureRef}>
            <section className="article_detail">
              {detail}
            </section>
          </div>
        }
      </Measure>
    )
  }


}

