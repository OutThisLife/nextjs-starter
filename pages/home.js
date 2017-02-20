import React from 'react'

// ---------------------------------------------

export default class HomeTemplate extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
		<div>
			<figure className="masthead" />
			<div dangerouslySetInnerHTML={{__html: this.props.content}} />
		</div>
		)
	}
}