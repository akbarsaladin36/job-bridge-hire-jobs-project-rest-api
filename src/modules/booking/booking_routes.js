const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')

Route.get('/hello', bookingController.sayHello)
Route.get('/book', bookingController.getAllBooking)
Route.get('/seat/:id', bookingController.getBookingSeatById)
Route.post('/book', bookingController.postBooking)

module.exports = Route
