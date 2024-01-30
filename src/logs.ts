import { ServerResponse } from "http";

const winston = require('winston');


export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    File: "./log.txt",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: 'logs.txt',
            dirname: `./logs`
        })
    ],
  });  

  export const loggerError = winston.createLogger({
    level: 'error',
    File: "./error.txt",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: 'error.txt',
            dirname: `./logs`
        })
    ],
  });  
