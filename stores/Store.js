import _ from 'lodash'
import EventEmitter from 'events'

// ---------------------------------------------

export default _.extend({}, EventEmitter.prototype, {
	_data: [],

	SaveData(obj) {
		this._data = obj
		this.emitChange()
	},

	Get(filter) {
		return _.first(_.filter(this._data, filter))
	},

	// --

	addChangeListener(callback) {
		this.on('change', callback)
	},

	emitChange: function() {
		this.emit('change')
	},
})