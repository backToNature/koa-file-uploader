# koa-file-uploader

[![Build Status](https://travis-ci.org/backToNature/koa-file-uploader.svg?branch=master)](https://travis-ci.org/backToNature/koa-file-uploader)
[![Coverage Status](https://coveralls.io/repos/github/backToNature/koa-file-uploader/badge.svg)](https://coveralls.io/github/backToNature/koa-file-uploader)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)


Simple File upload Service based on koa2.

[中文文档](https://github.com/backToNature/koa-file-uploader/blob/master/doc/zh-
cn.md)

## install

	npm install koa-file-uploader

## Usage
	
	const Koa = require('koa');
	const uploader = require('koa-file-uploader');
	
	const app = new Koa();
	const config = {
		apiPath: '/api/upload',
		destPath: '/dir'
	};
	app.use(config);
	
## demo

download this project, and execute the following command 

	npm install
	npm run demo

open[http://127.0.0.1:8000](http://127.0.0.1:8000) and try upload

## Config

### *destPath

* server file directory(Absolute path)
* type: ```String```

### *apiPath

* api router
* type: ```String```

### cors

* Whether cross-domain is allowed
* type: ```Boolean```
* default: ```false```

#### demo

	const config = {
		cors: true,
		apiPath: '/api/upload',
		destPath: '/dir'
	};
	app.use(config);

### corsDomainList

* Cross-domain whitelist(need to open ```cors```)
* type: ```String[]```

#### demo

	const config = {
		cors: true,
		apiPath: '/api/upload',
		corsDomainList: ['http://a.b.com']
		destPath: '/dir'
	};
	app.use(config);

### allowedExt

* file type whitelist
* type: ```String[]```

#### demo

	const config = {
		apiPath: '/api/upload',
		allowedExt: ['.jpg', '.png'],
		destPath: '/dir'
	};
	app.use(config);

### allowedSize

* Max file size(unit: KB)
* type: ```Number```

#### demo

	const config = {
		apiPath: '/api/upload',
		allowedSize: 30,
		destPath: '/dir'
	};
	app.use(config);

### saveAsMd5

* save file as md5 fileName
* type: ```Boolean```
* default: ```false```

#### demo

	const config = {
		apiPath: '/api/upload',
		saveAsMd5: true,
		destPath: '/dir'
	};
	app.use(config);

### uploadParam

* request field name
* type: ```String```
* default: ```"file"```

#### demo

	const config = {
		apiPath: '/api/upload',
		uploadParam: 'img',
		destPath: '/dir'
	};
	app.use(config);

### returnPrefix

* return a file directory to the front end
* type: ```String```
* default: ```/```

#### demo

	const config = {
		apiPath: '/api/upload',
		returnPrefix: '/assets/',
		destPath: '/dir'
	};
	app.use(config);
