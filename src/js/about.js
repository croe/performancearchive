/**
 * Created by Akihiro-Kato on 2017/03/27.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import data from './data';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount(){

    let _this = this;

  }

  componentDidMount(){
    $("html, body").animate({scrollTop: 0}, 1);
  }

  render() {
    return (
      <div className="wrap about" id="top">
        <div className="pagetop"><a href="#top"><img src="/images/pagetop.png" alt="pagetop"/></a></div>
      </div>
    )
  }

}

