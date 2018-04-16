const fileUploader = require('../index.js');
const path = require('path');
const _util = require('./_util.js');

describe('allowedExt', () => {
  it('upload error file, should return "fileType error"', (done) => {
    _util.upload({
      destPath: path.join(__dirname, './static'),
      apiPath: '/api/upload',
      allowedExt: ['.png']
    }, {
      uploadFilePath: path.join(__dirname, './file/test.jpg'),
      uploadParam: 'file',
      done
    }, (data, server) => {
      if (data && data.status === 1) {
        done();
      } else {
        done(new Error('failed'));
      }
    });
  });

  it('upload correct file, should return "success"', (done) => {
    _util.upload({
      destPath: path.join(__dirname, './static'),
      apiPath: '/api/upload',
      allowedExt: ['.png']
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
