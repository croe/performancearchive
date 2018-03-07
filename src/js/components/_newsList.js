/**
 * Created by Akihiro-Kato on 2017/03/20.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

// import data from '../data';

export default class NewsList extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isHidden: true,
      postsData: '',
      date: '',
      query: '',
      catname: ''
    }

  }

  componentWillMount() {

  }

  componentWillReceiveProps() {
  }

  componentDidMount() {

  }

  render() {
    let posts, catTitle;
    let count = 0;
    // console.log(this.props.feed)
    if (this.props.feed.feed !== undefined) {
      posts = this.props.feed.feed.data.map((item,i)=>{
        if (count < 3 && item.message) {
          count += 1;
          let dd = item.created_time.substring(0,10).split('-');
          return (
            <tr key={i}>
              <td className="date">{dd[0]+'-'+dd[1]+'-'+dd[2]}</td>
              <td className="message"><a href={"//www.facebook.com/" + item.id} target="_blank">{item.message}</a></td>
            </tr>
          )
        }
      });
    }

    return (
      <section className="news_list">
        <div className="inner">
          <h2>{this.props.title}</h2>
          <table>
            <tbody>
            { posts }
            </tbody>
          </table>
          <a href="//www.facebook.com/GIDS.GIDS.GIDS/" className="more" target="_blank">もっと見る</a>
        </div>
      </section>
    )
  }
}
