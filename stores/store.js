import EventEmitter from 'events'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'

require('es6-promise').polyfill()

// ---------------------------------------------

export default _.extend({}, EventEmitter.prototype, {
	data: [],

	async load() {
		if (_.isEmpty(this.data)) {
			const
				response = await fetch(`${process.env.WP_URL}/wp-json/invision/v1/sitedata?bust=${+new Date}`),
				json = await response.json()

			this.data = json
		}

		return true
	},

	// --

	GetFirst(filter) {
		return _.first(this.Get(filter))
	},

	Get(filter) {
		return _.filter(this.data, filter)
	},

	GetPage(slug) {
		return _.first(_.filter(this.data.pages, {
			url: slug,
		})) || {}
	},

	GetMenu(slug) {
		return this.data.menus[slug].links || []
	},

	isEmpty() {
		return _.isEmpty(this.data)
	},

	// --

	addChangeListener(callback) {
		this.on('change', callback)
	},

	emitChange() {
		this.emit('change')
	},
})