/* global Package */
Package.describe({
	summary: 'A way to inject data to the client with initial HTML',
	version: '2.3.3-alpha.1',
	git: 'https://github.com/Meteor-Community-Packages/meteor-inject-data',
	name: 'communitypackages:inject-data',
})

Package.onUse(function (api) {
	api.versionsFrom(['1.6.1', '3.0-alpha.11'])
	api.use('webapp', 'server')
	api.use(['ejson', 'ecmascript'], ['server', 'client'])
	api.mainModule('lib/namespace.js', ['server', 'client'])
	api.addFiles('lib/utils.js', ['server', 'client'])
	api.addFiles('lib/server.js', 'server')
	api.addFiles('lib/client.js', 'client')
	api.export('InjectData', ['client', 'server'])
})

Package.onTest(function (api) {
	api.use('communitypackages:inject-data')
	api.use('webapp', 'server')
	api.use(['underscore', 'tinytest'], ['client', 'server'])
	api.use('http', 'server') // TODO replace with fetch
	api.use('random', 'server')
	api.use('communitypackages:picker@1.1.1', 'server')
	api.addFiles(['tests/init.js'], 'server')
	api.addFiles(['tests/utils.js'], ['client', 'server'])
	api.addFiles(['tests/client.js'], 'client')
	api.addFiles(['tests/integration.js'], 'server')
})
