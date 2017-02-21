import React from 'react'

// ---------------------------------------------

export default class HomeTemplate extends React.PureComponent {
	render() {
		return (<div>
			<figure className="masthead" />
			<div dangerouslySetInnerHTML={{ __html: this.props.content }} />
		</div>)
	}
}

HomeTemplate.propTypes = {
	content: React.PropTypes.string.isRequired,
}