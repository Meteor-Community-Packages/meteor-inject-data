import { assert } from 'chai';

describe('inject-data - utils', function () {
  it('should encode and decode injected data', function () {
    const data = { aa: 10, date: new Date() };
    const str = InjectData._encode(data);
    const decoded = InjectData._decode(str);

    assert.equal(decoded.aa, data.aa);
    assert.equal(decoded.date.getTime(), data.date.getTime());
  });

  it('should decode empty data', function () {
    const str = '';
    const decoded = InjectData._decode(str);
    assert.equal(decoded, null);
  });

  it('should encode special chars', function () {
    const data = { special: '#://' };
    const str = InjectData._encode(data);

    assert.isFalse(/#/.test(str));
  });
});

