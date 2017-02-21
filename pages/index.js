import React from 'react'
import _ from 'lodash'
import Store from '../stores/store'
import Home from './home'
import Default from './default'
import Contact from './contact'

const Templates = {
	Home, Default, Contact,
}

// ---------------------------------------------

export default class Index extends React.Component {
	static async getInitialProps({ req }) {
		await Store.load()

		return {
			pathname: req.url,
			...Store.GetPage(req.url.replace('index', '')),
		}
	}

	render() {
		const contents = (() => {
			let tmpl

			if (this.props.pathname === '/')
				return <Home {...this.props} />

			if (tmpl = this.props.template) {
				const Dummy = Templates[_.upperFirst(tmpl.match(/template-([A-z]+)\./)[1])]
				return <Dummy {...this.props} />
			}

			return <Default {...this.props} />
		})()

		return <div>{contents}</div>
	}
}

Index.propTypes = {
	pathname: React.PropTypes.string.isRequired,
	template: React.PropTypes.string.isRequired,
}
