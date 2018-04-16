# koa-file-uploader

简易文件上传服务,只用配置config就能实现文件上传


## 快速开始

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


