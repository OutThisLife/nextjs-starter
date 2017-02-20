import _ from 'lodash'
import EventEmitter from 'events'

// ---------------------------------------------

export default _.extend({}, EventEmitter.prototype, {
	_data: [],

	SaveData(obj) {
		this._data = obj
		this.emitChange()
	},

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

	// --

	addChangeListener(callback) {
		this.on('change', callback)
	},

	emitChange: function() {
		this.emit('change')
	},
})