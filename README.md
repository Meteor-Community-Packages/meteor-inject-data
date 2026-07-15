# communitypackages:inject-data

A way to inject data to the client with initial HTML. A continuation of `meteorhacks:inject-data`.

> This is the package used by [`fast-render`](https://github.com/Meteor-Community-Packages/meteor-fast-render) to push data to the client with the initial HTML.

## Installation

```sh
meteor add communitypackages:inject-data
```

## Push Data

We need to use this package with a server side router. We've extended nodejs `http.OutgoingMessage` and provides an API like this.

Here is an example with [picker](https://github.com/Meteor-Community-Packages/picker).

```js
Picker.route('/', function(params, req, res, next) {
  var ejsonData = { aa: 10 }
  InjectData.pushData(req, 'some-key', ejsonData)
  // make sure to move the routing forward.
  next()
})
```

## Get Data

You can get data with the following API from the **client**.

```js
InjectData.getData('some-key', function(data) {
  console.log(data)
})
```

## Disable Automatic Injection

You may wish to manually inject the data payload if you are using SSR.

```js
InjectData._disableInjection = true
```

## Injection Location

By default, the injector will place the payload inside the `<head>` element. This is render blocking and intended to front-load the data for client-side rendering apps.

You can disable this functionality by setting `InjectData.injectToHead = false`. The payload will be placed before the closing `</body>` tag. Use this setting to deliver payloads after the initial render, e.g. SSR data hydration.
