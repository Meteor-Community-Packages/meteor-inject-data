# Change Log

## 2.3.2

- Fix issue that may occur if staringatlights:inject-data is also installed and causes the issue with `WebAppInternals.registerBoilerplateDataCallback` being called after `server-render` to return due to `WebAppInterals.RegisterBoilerplateDataCallback` reusing the address if the same key is used.

## 2.3.1

- released as `communitypackages:inject-data`
- Ensure that `WebAppInternals.registerBoilerplateDataCallback` gets called after `server-render` has added it's callback

## v2.1.1

- Removed duplicate file reference in `onTest` scenario
- Added check for `req.headers` in `InjectData.getData` in case the headers object does not exist on the request.

## v2.1.0

- Add `InjectData._disableInjection` flag to disable payload injection so it can be manually inserted by different SSR techniques.

## v2.0.5

- Override `meteorhacks:inject-data` if both packages are present, for greater backwards compatibility

## v2.0.4

- Add check to ensure the injection middleware always runs last

## v2.0.3

- Increase compatibility with other packages using `WebApp.connectHandlers.use`, including `reactrouter:react-router-ssr`

## v2.0.2

- Released as `staringatlights:inject-data`

## v2.0.1

- Update for Meteor 1.4.2+

## v2.0.0

2016-Feb-19

- Override individual res objects instead of overriding the prototype. This is a fix to support Meteor 1.3, which gave us the gzipped version of the html.
- Because of that we had to change the API a bit on the server. See:

- `res.pushData('key', {data: 'here'})` => `InjectData.pushData(res, 'key', {data: 'here'})`
- `res.getData('key')` => `InjectData.getData(res, 'key')`

## v1.4.1

- Use `EJSON.parse()`. See: [#4](https://github.com/meteorhacks/inject-data/pull/4)

## v1.4.0

- Add support for SSR by prepending the html on top of the first script tag

## v1.3.0

- Add IE8 Compatibility
