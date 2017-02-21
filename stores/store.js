import _ from 'lodash'
import EventEmitter from 'events'

require('es6-promise').polyfill()
require('isomorphic-fetch')

// ---------------------------------------------

export default _.extend({}, EventEmitter.prototype, {
	_data: [],

	async load() {
		console.log(process.env.WP_URL)
		if (_.isEmpty(this._data)) {
			const
				response = await fetch(process.env.WP_URL + '/wp-json/invision/v1/sitedata'),
				json = await response.json()

			this._data = json
		}

		return true
	},

	// --

	GetFirst(filter) {
		return _.first(this.Get(filter))
	},

	Get(filter) {
		return _.filter(this._data, filter)
	},

	GetPage(slug) {
		return _.first(_.filter(this._data.pages, {
			url: slug
		})) || {}
	},

	GetMenu(slug) {
		return this._data.menus[slug].links || []
	},

	isEmpty() {
		return _.isEmpty(this._data)
	},

	// --

	addChangeListener(callback) {
		this.on('change', callback)
	},

	emitChange: function() {
		this.emit('change')
	},
})