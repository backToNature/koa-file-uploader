# koa-file-uploader

基于koa2的简易文件上传服务

[![Build Status](https://travis-ci.org/backToNature/koa-file-uploader.svg?branch=master)](https://travis-ci.org/backToNature/koa-file-uploader)
[![Coverage Status](https://coveralls.io/repos/github/backToNature/koa-file-uploader/badge.svg)](https://coveralls.io/github/backToNature/koa-file-uploader)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)

## 安装

	npm install koa-file-uploader

## 使用
	
	const Koa = require('koa');
	const uploader = require('koa-file-uploader');
	
	const app = new Koa();
	const config = {
		apiPath: '/api/upload'
		destPath: '/dir'
	};
	app.use(uploader(config));
	
## 示例

check工程，并执行以下命令

	npm install
	npm run demo
	
打开[http://127.0.0.1:8000](http://127.0.0.1:8000)即可进行上传

## Config

### *destPath

* 服务器文件存储目录(绝对路径)
* type: ```String```


### cors

* 是否允许跨域,单独开启则对所有域名允许跨域
* type: ```Boolean```
* default: ```false```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		cors: true,
		apiPath: '/api/upload',
		destPath: '/dir'
	};
	app.use(uploader(config));

### corsDomainList

* 跨域域名白名单，需要开启```cors```才能生效
* type: ```String[]```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		cors: true,
		apiPath: '/api/upload',
		corsDomainList: ['http://a.b.com']
		destPath: '/dir'
	};
	app.use(uploader(config));

### allowedExt

* 上传文件类型白名单(后缀)
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

* 上传文件大小限制(单位: KB)
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

* 上传文件是否以md5码存储
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

* 文件上传字段名
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

* 返回的url前缀
* type: ```String```
* default: ```/```

#### demo

	const uploader = require('koa-file-uploader');
	const config = {
		apiPath: '/api/upload',
		returnPrefix: '/assets/',
		destPath: '/dir'
	};
	app.use(uploader(config));