import React from 'react'
import { render } from 'react-dom'
import Head from 'next/head'
import { classNames, stylesheet } from '../css/style.css'

// ---------------------------------------------

export default class Testing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			clicks: 1
		}
	}

	componentDidMount() {
		console.log(stylesheet)
	}

	click() {
		this.setState({
			clicks: this.state.clicks + 1
		})
	}

	render() {
		return (
		<span>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<style dangerouslySetInnerHTML={{__html: stylesheet}} />
			</Head>

			<div className="abcmouse" onClick={this.click.bind(this)}>clicks: {this.state.clicks}</div>
		</span>
		)
	}
}