const express = require('express')
const Route = express.Router()
const movieController = require('./movie_controller')

Route.get('/hello', movieController.sayHello)
Route.get('/', movieController.getAllMovie)
Route.get('/:id', movieController.getMovieById)
Route.post('/', movieController.postMovie)
Route.patch('/:id', movieController.updateMovie)
Route.delete('/:id', movieController.deletedMovie)

module.exports = Route
