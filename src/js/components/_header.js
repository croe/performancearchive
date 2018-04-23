/**
 * Created by Akihiro-Kato on 2016/06/08.
 */
import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';

import data from '../data';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { }
	}

	componentDidMount() {
	}

	setLangBtnHandleClick(e, lang){
		this.props.setLang(lang);
		console.log(this.props.langEn);
	}

	render() {
    let prod = data.production ? '/performancearchive/' : '/';
    let langCls = this.props.langEn ? 'btn_lang lang_en': 'btn_lang lang_ja';
		return (
				<header className="header">
					<div className="inner">
						<h1><Link to={prod}>IAMAS PERFORMANCE ARCHIVE</Link></h1>
						<div className={langCls}>
							<button className="ja" onClick={e => this.setLangBtnHandleClick(e, 'ja')}>Ja</button>
							<span>/</span>
							<button className="en" onClick={e => this.setLangBtnHandleClick(e, 'en')}>En</button>
						</div>
						<p className="copy">&copy;2018 IAMAS</p>
					</div>
				</header>
		)
	}
}