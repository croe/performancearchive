/**
 * Created by Akihiro-Kato on 2016/06/08.
 */
import React, {Component} from "react";
import {browserHistory, Router, Route, IndexRoute, Link} from 'react-router';
import $ from 'jquery';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { }
	}

	componentDidMount() {
	}

	render() {

		return (
				<header className="header">
					<div className="inner">
						<h1><Link to="/">IAMAS PERFORMANCE ARCHIVE</Link></h1>
						{/*<div className="btn_lang">*/}
							{/*<button className="is-active">Ja</button>*/}
							{/*<span>/</span>*/}
							{/*<button>En</button>*/}
						{/*</div>*/}
						<p className="copy">&copy;2018 IAMAS All Rights Reserved.</p>
					</div>
				</header>
		)
	}
}