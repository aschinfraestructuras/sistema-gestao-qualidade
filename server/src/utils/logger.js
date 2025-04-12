// server/src/utils/logger.js

const winston = require('winston');
const path = require('path');

// Definir níveis de log e cores
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Definir nível com base no ambiente
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'warn';
};

// Adicionar cores ao Winston
winston.addColors(colors);

// Formato do log
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Definir transports (saída para logs)
const transports = [
  // Console para todos os logs
  new winston.transports.Console(),
  
  // Arquivos para logs de erro e combinados
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/error.log'),
    level: 'error',
  }),
  new winston.transports.File({ 
    filename: path.join(__dirname, '../../logs/all.log') 
  }),
];

// Criar logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
