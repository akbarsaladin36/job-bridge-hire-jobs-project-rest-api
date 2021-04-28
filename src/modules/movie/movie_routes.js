const express = require('express')
const Route = express.Router()
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/hello', movieController.sayHello)
Route.get('/', authMiddleware.authentication, movieController.getAllMovie)
Route.get('/:id', movieController.getMovieById)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  movieController.postMovie
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  movieController.updateMovie
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  movieController.deletedMovie
)

module.exports = Route
