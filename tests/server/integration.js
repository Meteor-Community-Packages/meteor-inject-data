import { Picker } from 'meteor/communitypackages:picker';
import { fetch } from 'meteor/fetch';
import { check } from 'meteor/check';
import { should, assert } from 'chai';

should();

describe('inject-data - integration', function () {
  it('should send data', async function () {
    const path = '/' + Random.id();
    Picker.route(path, function (params, req, res, next) {
      InjectData.pushData(req, 'aa', { bb: 10 });
      next();
    });

    const data = await getInjectedData(path);
    const expected = { aa: { bb: 10 } };
    data.should.deep.equal(expected);
  });

  it('should get data on the client', async function () {
    const expected = { bb: 10 };
    const path = '/' + Random.id();
    Picker.route(path, function (params, req, res, next) {
      InjectData.pushData(req, 'aa', { bb: 10 });
      const data = InjectData.getData(req, 'aa');
      data.should.deep.equal(expected);
      next();
    });

    await getInjectedData(path);
  });

  it('should handle different types of data', async function () {
    const path = '/' + Random.id();
    const sendingData = {
      kk: { bb: 10 },
      c: true,
      d: 'string',
    };

    Picker.route(path, function (params, req, res, next) {
      _.each(sendingData, function (val, key) {
        InjectData.pushData(req, key, val);
      });
      next();
    });

    const data = await getInjectedData(path);
    data.should.deep.equal(sendingData);
  });

  it('should handle bad HTML chars', async function () {
    const path = '/' + Random.id();
    const text = "<s> sdsd //\\ </script>alert('hello');</script>";
    Picker.route(path, function (params, req, res, next) {
      InjectData.pushData(req, 'aa', text);
      next();
    });

    const data = await getInjectedData(path);
    const expected = { aa: text };
    data.should.deep.equal(expected);
  });

  it('should have empty data when none is sent', async function () {
    const path = '/' + Random.id();
    const data = await getInjectedData(path);
    assert.isNull(data);
  });

  it('should send with CORS', async function () {
    const path = '/' + Random.id();
    Picker.route(path, function (params, req, res, next) {
      InjectData.pushData(req, 'aa', { bb: 10 });
      res.writeHead(200, {
        'access-control-allow-origin': '*',
      });
      res.write('<!DOCTYPE html>');
      res.end();
    });

    const data = await getInjectedData(path);
    assert.isNull(data);
  });

  it('should not send with other than HTML', async function () {
    const path = '/' + Random.id();
    Picker.route(path, function (params, req, res, next) {
      InjectData.pushData(req, 'aa', { bb: 10 });
      res.write('some other data');
      res.end();
    });

    const data = await getInjectedData(path);
    assert.isNull(data);
  });
});

// Tinytest.add('integration - send with other than HTML', async function (test) {
//   const path = '/' + Random.id();
//   Picker.route(path, function (params, req, res, next) {
//     InjectData.pushData(res, 'aa', { bb: 10 });
//     res.write('some other data');
//     res.end();
//   });
//
//   const data = await getInjectedData(path);
//   test.equal(data, null);
// });

const urlResolve = Npm.require('url').resolve;
async function getInjectedData (path) {
  const url = urlResolve(process.env.ROOT_URL, path);
  const res = await fetch(url);
  const content = await res.text();
  const matched = content.match(/data">(.*)<\/script/);
  if (matched) {
    const encodedData = matched[1];
    return InjectData._decode(encodedData);
  } else {
    return null;
  }
}
