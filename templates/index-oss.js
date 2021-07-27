const { oss } = require('@serverless-devs/dk');

const baseHandler = async (ctx) => {
  console.log(ctx.events.toString());
  // 处理相关逻辑，比如文件解压，图片添加水印等
};

const handler = oss.onObjectCreated({
  handler: baseHandler,
  oss: {
    bucketName: 'your_bucket',
    filter: {
      prefix: 'source/',
      suffix: '.zip',
    },
  },
});

exports.handler = handler;
