/**
 * Created by Akihiro-Kato on 2017/03/20.
 */

import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';
import Modal from 'react-modal';

import data from '../data';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflowX             : 'hidden'
  }
};

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      modalIsOpen: false,
      selectCategory: ""
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

    console.log(this.props.tag)

  }

  openNavModal(e, sel){
    this.setState({
      modalIsOpen: true,
      selectCategory: sel
    })
  }

  closeNavModal(){
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    let navlist;
    if (this.props.tag.length){
      navlist = this.props.tag.map((item, i) => {
        let nameObj;
        if (item.description){
          nameObj = $.parseJSON(item.description);
        }
        let category = item.slug.split('-');
        if (this.state.selectCategory === category[0]){
          // let link = '/tags/' + item.slug;
          let link = '/performancearchive/tags/' + item.slug;
          return (
            <li key={i} onClick={this.closeNavModal.bind(this)}>
              <Link to={link}>
                {item.name}
              </Link>
            </li>
          )
        }
      })
    }
    return (
      <nav>
        <div className="inner">
          <ul className="menu">
            <li key={data.menu.news.link}>
              {data.menu.news.name}
            </li>
            <li key={data.menu.aboutus.link}>
              {data.menu.aboutus.name}
            </li>
            <li key={data.menu.contact.link}>
              {data.menu.contact.name}
            </li>
          </ul>
          <ul className="menu_tags">
            <li key={data.menu.artist.link} onClick={e => this.openNavModal(e, 'artist')}>
              {data.menu.artist.name}
            </li>
            <li key={data.menu.title.link} onClick={e => this.openNavModal(e, 'title')}>
              {data.menu.title.name}
            </li>
            <li key={data.menu.performer.link} onClick={e => this.openNavModal(e, 'per_col')}>
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