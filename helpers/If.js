import React from 'react'

// ---------------------------------------------

export default class If extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.test)
        	return null

    	return <span>{this.props.children}</span>
    }
}