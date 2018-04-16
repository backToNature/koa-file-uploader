const fileUploader = require('../index.js');
const path = require('path');
const _util = require('./_util.js');

describe('saveAsMd5', () => {
  it('set saveAsMd5 as true, should return "md5 fileName"', (done) => {
    _util.upload({
      destPath: path.join(__dirname, './static'),
      apiPath: '/api/upload',
      saveAsMd5: true
    }, {
      uploadFilePath: path.join(__dirname, './file/test.jpg'),
      uploadParam: 'file',
      done
    }, (data, server) => {
      if (data && data.status === 0) {
        if (data.data && data.data.fileName === 'B8928A731D228C4F94B52573D162BDAE.jpg') {
            done();
            return;
        }
      }
      done(new Error('failed'));
    });
  });
});
