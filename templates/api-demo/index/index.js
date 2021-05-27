
const { http } = require('@serverless-devs/dk');

const handler = http.onRequest({
  handler: (request) => {
    return {
      json: { result: 'this is api demo' },
    };
  },
});

exports.handler = handler;
