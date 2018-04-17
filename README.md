# koa-file-uploader


simple file upload server,you can send file by simple config.

简易文件上传服务,只用配置config就能实现文件上传

[![Build Status](https://travis-ci.org/backToNature/koa-file-uploader.svg?branch=master)](https://travis-ci.org/backToNature/koa-file-uploader)
[![Coverage Status](https://coveralls.io/repos/github/backToNature/koa-file-uploader/badge.svg)](https://coveralls.io/github/backToNature/koa-file-uploader)

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
	app.use(config);

## Config

### *destPath

* 文件存储目录(绝对路径)
* type: ```String```


### cors

* 是否允许跨域,单独开启则对所有域名允许跨域
* type: ```Boolean```
* default: ```false```

#### demo

	const config = {
		cors: true,
		destPath: '/dir'
	};
	app.use(config);

### corsDomainList

* 跨域域名白名单，需要开启```cors```才能生效
* type: ```String[]```

#### demo

	const config = {
		cors: true,
		corsDomainList: ['http://a.b.com']
		destPath: '/dir'
	};
	app.use(config);

### allowedExt

* 上传文件类型白名单(后缀)
* type: ```String[]```

#### demo

	const config = {
		allowedExt: ['.jpg', '.png'],
		destPath: '/dir'
	};
	app.use(config);

### allowedSize

* 上传文件大小限制(单位: KB)
* type: ```Number```

#### demo

	const config = {
		allowedSize: 30, // 限制文件大小为30kb
		destPath: '/dir'
	};
	app.use(config);

### saveAsMd5

* 上传文件是否以md5码存储
* type: ```Boolean```
* default: ```false```

#### demo

	const config = {
		saveAsMd5: true,
		destPath: '/dir'
	};
	app.use(config);

### uploadParam

* 文件上传字段名
* type: ```String```
* default: ```"file"```

#### demo

	const config = {
		uploadParam: 'img', // 以img作为文件上传字段
		destPath: '/dir'
	};
	app.use(config);

### returnPrefix

* 返回的url前缀
* type: ```String```
* default: ```/```

#### demo

	const config = {
		returnPrefix: '/assets/',
		destPath: '/dir'
	};
	app.use(config);


















### 不使用router

app.use(koa-file-uploader(config));

## config

### cors

是否允许跨域

### corsDomainList

跨域白名单

### destPath

文件存储目录

### allowedExt

允许的文件类型

### allowedSize

允许的文件大小，默认为20mb

### saveAsMd5

以md5存储文件

### uploadParam

上传字段, 默认为file

### returnPrefix

返回的文件url前缀

