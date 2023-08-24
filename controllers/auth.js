const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const { generateToken } = require('../utils/jwt');

const { HASH_SALT, COOKIE_MAXAGE } = require('../utils/settings');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return user;
      }))
    .then((data) => {
      const token = generateToken(data._id);
      // токен сохранили в httpOnly куку
      res.cookie('token', token, {
        maxAge: +COOKIE_MAXAGE,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      const u = data.toJSON();
      delete u.password;
      return res.send(u);
    })
    .catch((err) => next(err));
};

const logout = (req, res) => {
  res.clearCookie('token', {
    sameSite: 'none',
    secure: true,
  });
  return res.send({ message: 'Возвращайся!' });
};

const createUser = (req, res, next) => {
  const {
    password, email, name,
  } = req.body;
  return bcrypt.hash(password, +HASH_SALT)
    .then((hash) => User.create({
      password: hash, email, name,
    }))
    .then((user) => {
      const u = user.toJSON();
      delete u.password;
      res.status(201).send(u);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  logout,
};
