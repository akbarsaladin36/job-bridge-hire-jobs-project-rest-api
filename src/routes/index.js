const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const scheduleRouter = require('../modules/schedule/schedule_routes')

Route.use('/movie', movieRouter)
Route.use('/premiere', premiereRouter)
Route.use('/schedule', scheduleRouter)

module.exports = Route
