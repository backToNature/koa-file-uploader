# koa-file-uploader


simple file upload server,you can send file by simple config.

[![Build Status](https://travis-ci.org/backToNature/koa-file-uploader.svg?branch=master)](https://travis-ci.org/backToNature/koa-file-uploader)
[![Coverage Status](https://coveralls.io/repos/github/backToNature/koa-file-uploader/badge.svg)](https://coveralls.io/github/backToNature/koa-file-uploader)

[中文文档](https://github.com/backToNature/koa-file-uploader/blob/master/doc/zh-cn.md)


## install

	npm install koa-file-uploader

## Usage
	
	const Koa = require('koa');
	const uploader = require('koa-file-uploader');
	
	const app = new Koa();
	const config = {
		apiPath: '/api/upload'
		destPath: '/dir'
	};
	app.use(uploader(config));

## Config

### *destPath

* server file directory(Absolute path)
* type: ```String```


### cors

* Whether cross-domain is allowed
* type: ```Boolean```
* default: ```false```

#### demo
	
	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		cors: true,
		destPath: '/dir'
	};
	app.use(uploader(config));

### corsDomainList

* Cross-domain whitelist(need to open ```cors```)
* type: ```String[]```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		cors: true,
		corsDomainList: ['http://a.b.com']
		destPath: '/dir'
	};
	app.use(uploader(config));

### allowedExt

* file type whitelist
* type: ```String[]```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		allowedExt: ['.jpg', '.png'],
		destPath: '/dir'
	};
	app.use(uploader(config));

### allowedSize

* Max file size(unit: KB)
* type: ```Number```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		allowedSize: 30, // 限制文件大小为30kb
		destPath: '/dir'
	};
	app.use(uploader(config));

### saveAsMd5

* save file as md5 fileName
* type: ```Boolean```
* default: ```false```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		saveAsMd5: true,
		destPath: '/dir'
	};
	app.use(uploader(config));

### uploadParam

* request field name
* type: ```String```
* default: ```"file"```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		uploadParam: 'img', // 以img作为文件上传字段
		destPath: '/dir'
	};
	app.use(uploader(config));

### returnPrefix

* return a file directory to the front end
* type: ```String```
* default: ```/```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		returnPrefix: '/assets/',
		destPath: '/dir'
	};
	app.use(config);
