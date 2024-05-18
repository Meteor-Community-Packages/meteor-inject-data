/* global InjectData */
import { Picker } from 'meteor/communitypackages:picker'

Picker.route('/', function(params, req, res, next) {
	InjectData.pushData(req, 'hello', { meteorhacks: 'rocks' })
	next()
})
