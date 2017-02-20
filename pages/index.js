import React from 'react'
import Store from '../stores/Store'

// ---------------------------------------------

export default class Homepage extends React.Component {
	static async getInitialProps(ctx) {
		const
			response = await fetch('//headlesswp.herokuapp.com/wp-json/wp/v2/pages/2?v=' + +new Date),
			json = await response.json()

		return { page: json }
	}

	constructor(props) {
		super(props)
		this.state = { clicks: 1 }
	}

	handleClick() {
		this.setState({
			clicks: this.state.clicks + 1
		})
	}

	render() {
		return (
		<span>
			<div className="abcmouse" onClick={this.handleClick.bind(this)}>clicks: {this.state.clicks}</div>
			<hr />
			<div dangerouslySetInnerHTML={{__html: this.props.page.content.rendered}} />
		</span>
		)
	}
}