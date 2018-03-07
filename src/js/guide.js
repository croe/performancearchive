/**
 * Created by Akihiro-Kato on 2017/03/27.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import data from './data';

export default class Guide extends Component {

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
      <div className="wrap guide" id="top">
        <section className="facilities">
          <div className="inner">
            <h2>FACILITIES</h2>
            <ul>
              <li>
                <div className="head">
                  <h3>エントランス</h3>
                </div>
                <div className="content">
                  <img src="/images/guide_pct01.jpg"/>
                </div>
              </li>
              <li>
                <div className="head">
                  <h3>ギャラリースペース</h3>
                </div>
                <div className="content">
                  <img src="/images/guide_pct02.jpg"/>
                </div>
              </li>
              <li>
                <div className="head">
                  <h3>キッチン</h3>
                </div>
                <div className="content">
                  <img src="/images/guide_pct03.jpg"/>
                </div>
              </li>
              <li>
                <div className="head">
                  <h3>シェアオフィス</h3>
                </div>
                <div className="content">
                  <img src="/images/guide_pct04.jpg"/>
                </div>
              </li>
            </ul>
            <p>セミナールーム その他、宿泊可能な和室やシャワールームを完備しています。</p>
          </div>
        </section>
        <section className="admission">
          <div className="inner">
            <h2>ADMISSION</h2>
            <p>入会ご希望の方、または不明な点がございましたら、メールにてご連絡ください。<br />入会無料（入会審査あり）</p>
            <a className="mail" href="mailto:gids.neo@gmail.com">gids.neo@gmail.com</a>
          </div>
        </section>
        <section className="access">
          <div className="inner">
            <h2>ACCESS</h2>
            <p>〒501-1522 本巣市根尾樽見33番地1</p>
            <p>樽見駅から徒歩5分 / P有り</p>
            <div className="bytrain">
              <img src="/images/guide_pct_access.svg" />
            </div>
          </div>
        </section>
        <div className="pagetop"><a href="#top"><img src="/images/pagetop.png" alt="pagetop"/></a></div>
      </div>
    )
  }

}

