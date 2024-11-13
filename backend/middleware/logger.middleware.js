const logger=require('../config/logger')
const morgan=require('morgan')
const morganFormat = ":method :url :status :response-time ms"

const morgan_log=morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })

module.exports=morgan_log