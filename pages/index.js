require('es6-promise').polyfill()
require('isomorphic-fetch')

import React from 'react'
import Router from 'next/router'
import _ from 'lodash'
import Store from '../stores/store'

// ---------------------------------------------

import Home from './home'
import Default from './default'
import Contact from './contact'

const Templates = {
	Home, Default, Contact
}

// ---------------------------------------------

export default class Index extends React.Component {
	static async getInitialProps({ req }) {
		const
			response = await fetch(process.env.WP_URL + '/wp-json/invision/v1/sitedata?cb=' + +new Date),
			json = await response.json()

		Store.SaveData(json)

		return {
			pathname: req.url,
			...Store.GetPage(req.url.replace('index', ''))
		}
	}

	constructor(props) {
		super(props)
	}

	render() {
		const contents = (() => {
			if (this.props.pathname === '/')
				return <Home {...this.props} />

			let tmpl
			if (tmpl = this.props.template) {
				const Dummy = Templates[_.upperFirst(tmpl.match(/template\-([A-z]+)\./)[1])]
				return <Dummy {...this.props} />
			}

			return <Default {...this.props} />
		})()

		return <div>{contents}</div>
	}
}