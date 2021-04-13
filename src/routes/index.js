const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')

Route.use('/movie', movieRouter)
Route.use('/premiere', premiereRouter)

module.exports = Route
