/* global Package */
Package.describe({
  summary: 'A way to inject data to the client with initial HTML',
  version: '3.0.0-beta.0',
  git: 'https://github.com/Meteor-Community-Packages/meteor-inject-data',
  name: 'communitypackages:inject-data',
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@3.0.1');
  api.use('webapp', 'server');
  api.use(['ejson', 'ecmascript', 'typescript'], ['server', 'client']);
  api.use('zodern:types@1.0.13');
  api.mainModule('lib/namespace.ts', ['server', 'client']);
  api.addFiles('lib/utils.js', ['server', 'client']);
  api.addFiles('lib/server.js', 'server');
  api.addFiles('lib/client.ts', 'client');
  api.export('InjectData', ['client', 'server']);
});

Package.onTest(function (api) {
  api.use('communitypackages:inject-data');
  api.use('webapp', 'server');
  api.use(['meteortesting:browser-tests@1.7.0', 'meteortesting:mocha@3.2.0']);
  api.use(['ecmascript', 'typescript', 'underscore'], ['client', 'server']);
  api.use('zodern:types@1.0.13');
  api.use(['http', 'random'], 'server');
  api.use('communitypackages:picker@2.0.0-beta.0', 'server');
  api.mainModule('tests/server/index.js', 'server');
  api.mainModule('tests/client/index.js', 'client');
});
