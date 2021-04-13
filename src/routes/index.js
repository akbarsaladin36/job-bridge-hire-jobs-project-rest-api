const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const showTimeRouter = require('../modules/show_time/show_time_routes')
const bookingRouter = require('../modules/booking/booking_routes')

Route.use('/movie', movieRouter)
Route.use('/premiere', premiereRouter)
Route.use('/show_time', showTimeRouter)
Route.use('/booking', bookingRouter)

module.exports = Route
