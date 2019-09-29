const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;
const moment = require('moment-timezone')
//
const logFormat = printf((info) => {
  return `${info.timestamp} - ${info.fileName} - ${info.level.toUpperCase()} - ${info.message}`;
});
//
const appendTimestamp = format((info) => {
  info.timestamp = moment().tz(moment.tz.guess()).format('DD/MM/YYYY HH:mm:ss');
  return info;
});
//
const appendFileName = format((info, opts) => {
  info.fileName = opts
  return info 
})
//
function moduleLogger(args) {
  const logger = createLogger({
    format: combine(
      format.splat(),
      format.simple(),
      appendTimestamp(),
      appendFileName(args),
      logFormat
    ),
    transports: [new transports.Console()]
  });
  return logger  
}
//
module.exports = { moduleLogger }