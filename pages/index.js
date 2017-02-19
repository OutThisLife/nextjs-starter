import React from 'react'
import { render } from 'react-dom'
import Head from 'next/head'

// ---------------------------------------------

export default class Testing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			clicks: 1
		}
	}

	click() {
		this.setState({
			clicks: this.state.clicks + 1
		})
	}

	render() {
		return (
		<div className="abcmouse" onClick={this.click.bind(this)}>clicks: {this.state.clicks}</div>
		)
	}
}