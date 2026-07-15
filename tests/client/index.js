import { InjectData } from 'meteor/communitypackages:inject-data';
import { should, assert } from 'chai';
import '../utils';

should();
describe('inject-data - integration', function () {
  it('should get data', async function () {
    InjectData.getData('hello', function (data) {
      data.should.deep.equal({ meteorhacks: 'rocks' });
    });
  });
}); 

