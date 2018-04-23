import React, {Component} from "react";
import {render} from "react-dom";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';
import _ from 'lodash';

import Header from './components/_header';
import Footer from './components/_footer';
import Navigation from './components/_navigation';

import data from './data';

import Index from './index';
import About from './about';
import Member from './member';
import Project from './project';
import Opinion from './opinion';
import Guide from './guide';

import Tags from './tags';
import Articles from './articles';

const dir = (data.production) ? "/performancearchive/" : "/";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPagesLoaded: false,
      isMediaLoaded: false,
      isLoaded: false,
      fbFeed: '',
      article: [],
      articleMember: [],
      articleOpinion: [],
      tags: [],
      perPage: data.val.per_page,
      pageCount: data.val.page,
      pageCountM: data.val.page,
      pageCountO: data.val.page,
      isLangEn: true
    };
    this.getNextArticleList = this.getNextArticleList.bind(this);
    this.setLang = this.setLang.bind(this)
  }

  componentWillMount() {

    let it = this;
    $.ajaxSetup({cache: true});
    $.ajax({
      url: data.paths[0].LIMIT_POST_URI,
      dataType: 'json'
    }).done(function (data) {
      console.log(data)
      it.setState({article: data});
    });

    $.ajax({
      url: data.paths[0].TAGS_URI,
      dataType: 'json'
    }).done(function (data) {
      it.setState({tags: data});
      console.log(data);
    })

  }

  getNextArticleList() {

    let it = this;
    let hash = location.pathname.replace('\/tags\/', '');
    if (hash === 'MEMBER') {
      let nextPage = this.state.pageCountM + 1;
      it.setState({pageCountM: nextPage});
      $.ajax({
        url: data.paths[0].MEMBER_URI + '&page=' + nextPage,
        dataType: 'json'
      }).done(function (data) {
        console.log(data);
        let newArr = _.union(it.state.articleMember, data);
        if (data.length === 0) {
          $('#getmore').remove();
        } else {
          it.setState({articleMember: newArr});
        }
      });
    } else if (hash === 'OPINION') {
      let nextPage = this.state.pageCountO + 1;
      it.setState({pageCountO: nextPage});
      $.ajax({
        url: data.paths[0].OPINION_URI + '&page=' + nextPage,
        dataType: 'json'
      }).done(function (data) {
        console.log(data);
        let newArr = _.union(it.state.articleOpinion, data);
        if (data.length === 0) {
          $('#getmore').remove();
        } else {
          it.setState({articleOpinion: newArr});
        }
      });
    } else {
      let nextPage = this.state.pageCount + 1;
      it.setState({pageCount: nextPage});
      $.ajax({
        url: data.paths[0].LIMIT_POST_URI + '&page=' + nextPage,
        dataType: 'json'
      }).done(function (data) {
        console.log(data);
        let newArr = _.union(it.state.article, data);
        if (data.length === 0) {
          $('#getmore').remove();
        } else {
          it.setState({article: newArr});
        }
      });
    }

  }

  setLang(lang) {
    if(lang === 'ja') {
      this.setState({
        isLangEn: false
      })
    } else {
      this.setState({
        isLangEn: true
      })
    }
  }

  render() {
    return (
      <div>
        <Header
          setLang={this.setLang}
          langEn={this.state.isLangEn}
        />
        <div className="layout">
          <Navigation
            tag={this.state.tags}
            langEn={this.state.isLangEn}
          />
          {this.props.children && React.cloneElement(this.props.children, {
            feed: this.state.fbFeed,
            article: this.state.article,
            articleMember: this.state.articleMember,
            articleOpinion: this.state.articleOpinion,
            tags: this.state.tags,
            page: this.state.pageCount,
            langEn: this.state.isLangEn,
            onEventCallBack: this.getNextArticleList
          })}
        </div>
        <Footer/>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path={dir} component={App}>
      <IndexRoute component={Index}/>
      <Route path={`${dir}about`} component={About}/>
      <Route path={`${dir}tags/artist`} component={Tags}/>
      <Route path={`${dir}tags/title`} component={Tags}/>
      <Route path={`${dir}tags/performer`} component={Tags}/>
      <Route path={`${dir}tags/year_production`} component={Tags}/>
      <Route path={`${dir}tags/year_recording`} component={Tags}/>
      <Route path={`${dir}tags/director`} component={Tags}/>
      <Route path={`${dir}tags/:tag`} component={Tags}/>
      <Route path={`${dir}articles/:article`} components={Articles}/>
    </Route>
  </Router>
), document.getElementById('main'));
