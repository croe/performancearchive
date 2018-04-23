/**
 * Created by Akihiro-Kato on 2017/03/20.
 */

import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';
import _ from 'lodash';
import Modal from 'react-modal';

import data from '../data';

const customStyles = {
  overlay: {
    width: 'calc(100% - 315px)',
    position: 'absolute',
    background: 'transparent',
    right: 0,
    left: 'auto',
    top: '136px'
  },
  content: {
    position: 'absolute',
    width: '100%',
    right: 0,
    left: 'auto',
    background: 'rgb(255, 255, 255)',
    overflowX: 'hidden',
    overflowY: 'auto',
    outline: 'none',
    padding: 0,
    height: 'calc(100% - 136px)',
    top: 0,
    border: 'none'
  }
};

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      modalIsOpen: false,
      selectCategory: "",
      prevIndexAlphabet: ''
    }
  }

  componentDidMount() {

    if ($(window).width() < 769) {
      $('nav').on('click', function () {
        if ($(this).hasClass('is-active')) {
          $(this).removeClass('is-active');
        } else {
          $(this).addClass('is-active');
        }
      });
    }

    $("nav .inner").css({height: $(window).innerHeight() - $("header").innerHeight()})

  }

  openNavModal(e, sel) {
    this.setState({
      modalIsOpen: true,
      selectCategory: sel
    })
  }

  closeNavModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    let navlist;
    let tagArr;
    let title;
    if (this.props.tag.length) {
      let it = this;
      tagArr = _.sortBy(this.props.tag, [function (o) {
        // return it.props.langEn ? $.parseJSON(o.description).name_en : $.parseJSON(o.description).name_ja;
        return $.parseJSON(o.description).name_en;
      }]);
      navlist = tagArr.map((item, i) => {
        let obj;
        if (item.description) {
          obj = $.parseJSON(item.description);
          let category = obj.category;
          if (this.state.selectCategory === category) {
            let prod = data.production ? '/performancearchive/tags/' : '/tags/';
            let link = prod + item.slug;
            let name = this.props.langEn ? obj.name_en : obj.name_ja;
            if (this.state.selectCategory === "artist"){ title = "Artist"}
            if (this.state.selectCategory === "title"){ title = "Title"}
            if (this.state.selectCategory === "performer"){ title = "Performer/Collaborator"}
            if (this.state.selectCategory === "yop"){ title = "Year of Production"}
            if (this.state.selectCategory === "yor"){ title = "Year of Recording"}
            if (this.state.selectCategory === "record"){ title = "Recording Director"}
            if (this.state.selectCategory === "artist" ||
              this.state.selectCategory === "title" ||
              this.state.selectCategory === "performer" ||
              this.state.selectCategory === "record") {
              let index = obj.name_en.toUpperCase().slice(0, 1);
              let firstClass = (this.state.prevIndexAlphabet !== index) ? 'index' : '';
              this.state.prevIndexAlphabet = index;
              return (
                <li key={i} className={firstClass} onClick={this.closeNavModal.bind(this)}>
                  <Link to={link} data-index={index}>
                    {name}
                  </Link>
                </li>
              )
            } else {
              return (
                <li key={i} onClick={this.closeNavModal.bind(this)}>
                  <Link to={link}>
                    {name}
                  </Link>
                </li>
              )
            }
          }
        }
      })
    }
    return (
      <nav>
        <div className="inner">
          <ul className="menu">
            <li>
              <Link to={data.menu.news.link}>{data.menu.news.name}</Link>
            </li>
            <li>
              <Link to={data.menu.aboutus.link}>{data.menu.aboutus.name}</Link>
            </li>
            <li>
              <Link to={data.menu.contact.link}>{data.menu.contact.name}</Link>
            </li>
          </ul>
          <ul className="menu_tags">
            <li key={data.menu.artist.link} onClick={e => this.openNavModal(e, 'artist')}>
              {data.menu.artist.name}
            </li>
            <li key={data.menu.title.link} onClick={e => this.openNavModal(e, 'title')}>
              {data.menu.title.name}
            </li>
            <li key={data.menu.performer.link} onClick={e => this.openNavModal(e, 'performer')}>
              {data.menu.performer.name}
            </li>
            <li key={data.menu.production.link} onClick={e => this.openNavModal(e, 'yop')}>
              {data.menu.production.name}
            </li>
            <li key={data.menu.recording.link} onClick={e => this.openNavModal(e, 'yor')}>
              {data.menu.recording.name}
            </li>
            <li key={data.menu.director.link} onClick={e => this.openNavModal(e, 'record')}>
              {data.menu.director.name}
            </li>
          </ul>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
        >
          <div className="nav_modal">
            <h2>{title}</h2>
            <ul>
              {navlist}
            </ul>
            <button onClick={this.closeNavModal.bind(this)}>Close</button>
          </div>
        </Modal>
      </nav>
    )
  }


}