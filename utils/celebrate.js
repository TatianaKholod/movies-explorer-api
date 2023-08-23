const { Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const url = /^(https?:\/\/)?([\w\W\.]+)\.([a-z]{2,6}\.?)(\/[\w\W\.]*)*\/?$/i;

const ShemaId = {
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

const ShemaMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(url),
    trailer: Joi.string().required().pattern(url),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(url),
    movieId: Joi.number().required(),
  }),
};
const ShemaLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
};
const ShemaUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports = {
  ShemaId,
  ShemaMovie,
  ShemaUser,
  ShemaLogin,
};
