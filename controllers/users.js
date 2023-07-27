const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

const getUser = (req, res, next) => {
  const { _id: userId } = req.user;

  return User.findById(userId)
    .orFail(new NotFoundError('Объект не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  return User.findByIdAndUpdate(userId, { name, email }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new NotFoundError('Объект не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
};
