/**
 * Created by Akihiro-Kato on 2017/03/27.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import data from './data';

import ArticleList from './components/_articleList';

export default class Opinion extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.pushMessage = this.pushMessage.bind(this);
  }

  componentWillMount(){

    let _this = this;

  }

  componentDidMount(){
    $("html, body").animate({scrollTop: 0}, 1);
  }

  pushMessage(){
    this.props.onEventCallBack();
  }

  render() {
    return (
      <div className="wrap member" id="top">
        <ArticleList
          title={'OPINION'}
          article={this.props.articleOpinion}
          tags={this.props.tags}
          page={this.props.page}
          onEventCallBack={this.pushMessage}
        />
        <div className="pagetop"><a href="#top"><img src="/images/pagetop.png" alt="pagetop"/></a></div>
      </div>
    )
  }

}

