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
      modalIsOpen: false
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

  openNavModal(){
    this.setState({
      modalIsOpen: true
    })
  }

  closeNavModal(){
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    // let navlist = this.props.tag.map((item, i) => {
    //   return (
    //     <li key={i}>
    //       <p>{item.name}</p>
    //     </li>
    //   )
    // })
    return (
      <nav>
        {
          console.log(this.props.tag)
        }
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
            <li key={data.menu.artist.link} onClick={this.openNavModal.bind(this)}>
              {/*<Link to={data.menu.artist.link}>{data.menu.artist.name}</Link>*/}
              <a>{data.menu.artist.name}</a>
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
        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
        >
          <div className="nav_modal">
            <ul>
              {/*{navlist}*/}
            </ul>
            <button onClick={this.closeNavModal.bind(this)}>Close</button>
          </div>
        </Modal>
      </nav>
    )
  }


}