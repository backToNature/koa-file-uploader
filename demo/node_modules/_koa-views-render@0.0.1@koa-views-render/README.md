# koa-views-render

[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/ladjs/koa-views-render.svg)](<>)

> Simple `render(page, locals)` middleware for [Koa][] and [Lad][] (uses [koa-views][]).


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install @ladjs/koa-views-render
```

[yarn][]:

```sh
yarn add @ladjs/koa-views-render
```


## Usage

> This is a simple middleware that simply passes down to `ctx.render` the `page` and `locals` arguments you provide.
>
> For example `render(page,locals)` will get passed to `ctx.render(page,locals)`. See [koa-views][] for full reference.

```js
const render = require('koa-views-render');

// ...

app.use(render('home'));
```

> With optional `locals` object argument:

```js
app.use(render('about', title: 'About Us' });
```


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[koa]: http://koajs.com

[lad]: https://lad.js.org

[koa-views]: https://github.com/queckezz/koa-views
