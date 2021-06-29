const { dk } = require('@serverless-devs/dk');

const handler = dk((ctx) => {
  // ctx 包含 ctx.req 可获取入参信息
  return {
    json: { title: 'hello serverless devs' },
  };
});

exports.handler = handler;
