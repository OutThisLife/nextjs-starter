import React from 'react'

// ---------------------------------------------

export default class DefaultTemplate extends React.PureComponent {
	render() {
		return <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
	}
}

DefaultTemplate.propTypes = {
	content: React.PropTypes.string.isRequired,
}