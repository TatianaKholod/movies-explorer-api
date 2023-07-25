const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');

const getMovies = (req, res, next) => Movie.find({}).sort({ createdAt: -1 })
  .then((movies) => res.send(movies))
  .catch(next);

// в теле запроса д/б данные
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
const creatMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer: trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      const m = movie.toJSON();
      res.status(201).send(m);
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { id: moveId } = req.params;

  return Movie.findById(moveId)
    .orFail(new NotFoundError('Объект не найден'))
    .then((movie) => movie.deleteOne({ _id: moveId }))
    .then((data) => res.send(data))
    .catch(next);
};

module.exports = {
  getMovies,
  creatMovie,
  deleteMovieById,
};
