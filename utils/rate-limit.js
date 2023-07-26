const rateLimit = require('express-rate-limit');
const { limitMs, LimitReq } = require('./settings');

const limiter = rateLimit({
  // лимит в limitMs милисек
  windowMs: limitMs,
  // не больше 100 запросов с одного IP за limitMs
  max: LimitReq,
  // в заголовках вернет данные об ограничениях
  standardHeaders: true,
  // не будем отключать заголовки X-RateLimit-*
  legacyHeaders: false,
});

module.exports = { limiter };
