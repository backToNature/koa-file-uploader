const render = (page, locals) => {
  return ctx => ctx.render(page, locals);
};

module.exports = render;
