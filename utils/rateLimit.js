const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  // лимит в 15 минут
  windowMs: 15 * 60 * 1000,
  // не больше 100 запросов с одного IP за 15 мин
  max: 100,
  // в заголовках вернет данные об ограничениях
  standardHeaders: true,
  // не будем отключать заголовки X-RateLimit-*
  legacyHeaders: false,
});

module.exports = { limiter };
