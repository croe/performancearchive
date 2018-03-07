/**
 * Created by Akihiro-Kato on 2017/03/20.
 */

import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';

import data from '../data';

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    }
  }

  componentDidMount() {

    if ($(window).width() < 769) {
      $('nav').on('click', function(){
        if($(this).hasClass('is-active')){
          $(this).removeClass('is-active');
        } else {
          $(this).addClass('is-active');
        }
      });
    }

  }

  render() {
    return (
      <nav>
        <div className="inner">
          <ul className="menu">
            <li key={data.menu.news.link}>
              <Link to={data.menu.news.link}>{data.menu.news.name}</Link>
            </li>
            <li key={data.menu.aboutus.link}>
              <Link to={data.menu.aboutus.link}>{data.menu.aboutus.name}</Link>
            </li>
            <li key={data.menu.contact.link}>
              <Link to={data.menu.contact.link}>{data.menu.contact.name}</Link>
            </li>
          </ul>
          <ul className="menu_tags">
            <li key={data.menu.artist.link}>
              <Link to={data.menu.artist.link}>{data.menu.artist.name}</Link>
            </li>
            <li key={data.menu.title.link}>
              <Link to={data.menu.title.link}>{data.menu.title.name}</Link>
            </li>
            <li key={data.menu.performer.link}>
              <Link to={data.menu.performer.link}>{data.menu.performer.name}</Link>
            </li>
            <li key={data.menu.production.link}>
              <Link to={data.menu.production.link}>{data.menu.production.name}</Link>
            </li>
            <li key={data.menu.recording.link}>
              <Link to={data.menu.recording.link}>{data.menu.recording.name}</Link>
            </li>
            <li key={data.menu.director.link}>
              <Link to={data.menu.director.link}>{data.menu.director.name}</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }


}