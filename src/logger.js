import pino from 'pino'

function buildProdLogger() {
  const prodLogger = pino('debug.log');
  prodLogger.level = 'debug'
  return prodLogger
}

function buildDevLogger() {
  const devLogger = pino('devlogger.log')
  devLogger.level = 'info'
  return devLogger
}

let logger = null
//console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'PROD') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

//module.exports = logger
export {  logger }