const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const multer = require('koa-multer');
const shell = require('shelljs');

const md5 = (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    const md5sum = crypto.createHash('md5');
    stream.on('data', (chunk) => {
        md5sum.update(chunk);
    });
    stream.on('end', () => {
        str = md5sum.digest('hex').toUpperCase();
        resolve(str);
    });
    stream.on('error', (err) => {
        reject(err);
    });
  });
};

/**
 * @description simple file upload
 * @param {Object} config - 上传配置项
 * @param {String} config.destPath - 文件存储目录(绝对路径)
 * @param {String} [config.apiPath=api/upload] - api路径
 * @param {String[]} [config.allowedExt] - 允许的文件类型列表
 * @param {Number} [config.allowedSize=1024*20] - 允许的文件大小,单位KB
 * @param {Boolean}  [config.cors=false] - 是否允许跨域
 * @param {String[]} [config.corsDomainList] - 跨域域名白名单
 * @param {String} [config.uploadParam="file"] - post字段,默认为file
 * @param {Boolean} [config.saveAsMd5=false] - 以md5存储文件
 * @param {String} [config.returnPrefix=""] - 返回的文件url路径
 * @param {Function} [config.fnComplete=] - 上传完成后不直接返回，走回调
 */
module.exports = (config = {}) => {
  return async (ctx, next) => {
    if (ctx.method !== 'POST') {
      await next();
      return false;
    }
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        if (config.saveAsMd5 === true) {
          cb(null, os.tmpdir());
        } else {
          if (!fs.existsSync(config.destPath)) {
            shell.mkdir(config.destPath);
          }
          cb(null, config.destPath);
        }
      },
      filename(req, file, cb) {
        const extName = path.extname(file.originalname);
        if (config.saveAsMd5 === true) {
            cb(null, Date.now() + extName);
        } else {
            cb(null, file.originalname);  
        }
      }
    });

    const multerConfig = {
      fileFilter(req, file, cb) {
        let extName = path.extname(file.originalname);
        if (config.allowedExt && config.allowedExt.length) {
          if (config.allowedExt.indexOf(extName) >= 0) {
            cb(null, true);
          } else {
            cb({
              code: "FILE_TYPE_ERROR"
            }, false);
          }
        } else {
          cb(null, true);
        }
      },
      storage
    };

    if (config.allowedSize) {
      multerConfig.limits = { fileSize: config.allowedSize * 1000 };
    }
  
    const upload = multer(multerConfig);

    if (config.cors === true) {
      ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      if (config.corsDomainList && config.corsDomainList.length > 0) {
        if (config.corsDomainList.indexOf(ctx.headers.origin) >= 0) {
          ctx.set('Access-Control-Allow-Origin', config.corsDomainList.join(','));
        } else {
          return await next();
        }
      } else {
        ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
      }
    }

    const doUpload = async (ctx, next) => {
      try {
        await upload.single(config.uploadParam || 'file')(ctx, next);
        const file = ctx.req.file;
        if (!file) {
          return await next();
        }
        let filePath;
        let retFileName;
        let absolutePath;
        let msgObj = {};
        if (config.saveAsMd5 === true) {
            try {
              const md5Code = await md5(file.path);
              const extName = path.extname(file.filename);
              const newFileName = `${md5Code}${extName}`;
              const newFileNamePath = path.join(file.destination, newFileName);
              shell.mv(file.path, newFileNamePath);
              absolutePath = newFileNamePath;
              if (config.destPath && !fs.existsSync(config.destPath)) {
                shell.mkdir(path.join(config.destPath));
              }
              if (config.destPath && fs.existsSync(config.destPath)) {
                  absolutePath = path.join(config.destPath, newFileName);
                  shell.mv(newFileNamePath, absolutePath);
              }
              retFileName = newFileName;
              filePath = config.returnPrefix ? config.returnPrefix : '';
            } catch (e) {
              msgObj = {
                status: 3,
                data: {},
                msg: 'check md5 failed'
              };
              ctx.body = msgObj;
              return false;
            }
        } else {
          retFileName = file.filename;
          filePath = config.returnPrefix ? config.returnPrefix : '';
        }

        msgObj = {
          status: 0,
          data: {
            fileName: retFileName,
            filePath
          },
          msg: 'upload success'
        };

        if (typeof config.fnComplete === 'function') {
          msgObj.data.absolutePath = absolutePath;
          ctx.uploadFileInfo = msgObj;
          await config.fnComplete(ctx, next);
        } else {
          ctx.body = msgObj;
        }
        return false;
      } catch (e) {
          switch (e.code) {
              case 'FILE_TYPE_ERROR': {
                  ctx.body = {
                      status: 1,
                      msg: 'fileType error'
                  };
                  break;
              }
              case 'LIMIT_FILE_SIZE': {
                  ctx.body = {
                      status: 2,
                      msg: 'fileSize Exceed'
                  };
                  break;
              }
          }
      }
    };

    if (config.apiPath) {
        if (ctx.path === config.apiPath) {
          await doUpload(ctx, next);
        } else {
          await next();
          return false;
        }
    } else {
      await doUpload(ctx, next);
    }

  };
};