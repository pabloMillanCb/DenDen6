import { ServerResponse } from "http";

const winston = require('winston');


const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    File: "./log.txt",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: 'error.log',
            dirname: `./logs`
        })
    ],
  });  

exports.responseLog = async (req: Request, res: ServerResponse) => {
    logger.info({
      response: "holi",
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      date: Date(),
    });
    return res
  }

export default logger