import React from 'react'

// ---------------------------------------------

export default class If extends React.PureComponent {
	render() {
		if (!this.props.test)
			return null

		return <span>{this.props.children}</span>
	}
}

If.propTypes = {
	test: React.PropTypes.bool.isRequired,
	children: React.PropTypes.node.isRequired,
}