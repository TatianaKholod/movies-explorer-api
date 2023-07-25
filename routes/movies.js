const router = require('express').Router();
const { celebrate } = require('celebrate');
const { ShemaId, ShemaMovie } = require('../utils/celebrate');
const { getMovies, creatMovie, deleteMovieById } = require('../controllers/movies');

// вернуть все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создать фильм с переданными в теле данными
router.post('/', celebrate(ShemaMovie), creatMovie);

// удалить сохранённый фильм по id
router.delete('/:id', celebrate(ShemaId), deleteMovieById);

module.exports = router;
