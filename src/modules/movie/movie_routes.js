const express = require('express')
const Route = express.Router()
// const { sayHello } = require('./movie_controller')
const movieController = require('./movie_controller')

Route.get('/hello', movieController.sayHello)
Route.get('/', movieController.getAllMovie)

module.exports = Route
