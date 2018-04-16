const Koa = require('koa');
const fileUploader = require('../index.js');
const path = require('path');
const request = require('supertest');
const FormData = require('form-data');
const fs = require('fs');
const assert = require('assert');

module.exports = {
    upload(config = {}, testConfig, fn) {
        const app = new Koa();
        app.host = process.env.IP || 'localhost';
        app.port = process.env.PORT || 8123;
        app.use(fileUploader(config));
        const server = app.listen(app.port, app.host, () => {
          const form = new FormData();
          const filePath = testConfig.uploadFilePath;
          form.append(testConfig.uploadParam, fs.createReadStream(filePath));
          form.submit('http://localhost:8123/api/upload', (err, res) => {
            res.setEncoding('utf8')
            let body = '';
            res.on('data', (chunk) => {
              body += chunk;
            })
            res.on('end', () => {
              try {
                const data = JSON.parse(body);
                fn(data, server);
              } catch (er) {
                testConfig.done(er);
              }
              server.close();
            });
          })
        });
    }
};