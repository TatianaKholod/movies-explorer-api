const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const { ShemaUser } = require('../utils/celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authMiddelware = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const { createUser, login, logout } = require('../controllers/auth');
const NotFoundError = require('../errors/not-found-error');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger); // логгер запросов

router.post('/signin', celebrate(ShemaUser), login);
router.post('/signup', celebrate(ShemaUser), createUser);

router.use('/', authMiddelware);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.delete('/signin', logout); // для удаления куки

router.use('*', (req, res, next) => { next(new NotFoundError('URL неверный')); });

router.use(errorLogger); // логгер ошибок
router.use(errors()); // обработчик ошибок celebrate
router.use(handleError); // централизованный обработчик ошибок

module.exports = router;
