const fileUploader = require('../index.js');
const path = require('path');
const _util = require('./_util.js');

describe('allowedSize', () => {
  it('upload big size file, should return "fileSize error"', (done) => {
    _util.upload({
      destPath: path.join(__dirname, './static'),
      apiPath: '/api/upload',
      allowedSize: 30
    }, {
      uploadFilePath: path.join(__dirname, './file/test.jpg'),
      uploadParam: 'file',
      done
    }, (data, server) => {
      if (data && data.status === 2) {
        done();
      } else {
        done(new Error('failed'));
      }
    });
  });

  it('upload correct size file, should return "success"', (done) => {
    _util.upload({
      destPath: path.join(__dirname, './static'),
      apiPath: '/api/upload',
      allowedSize: 30
    }, {
      uploadFilePath: path.join(__dirname, './file/test.png'),
      uploadParam: 'file',
      done
    }, (data, server) => {
      if (data && data.status === 0) {
        done();
      } else {
        done(new Error('failed'));
      }
    });
  });
});
