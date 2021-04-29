const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')
const redisMiddleware = require('../../middleware/redis')
const authMiddleware = require('../../middleware/auth')

Route.get('/hello', bookingController.sayHello)
Route.get('/book', bookingController.getAllBooking)
Route.get(
  '/book-seat',
  authMiddleware.authentication,
  redisMiddleware.getBookingSeatRedis,
  bookingController.getBookingById
)
Route.get('/seat/:id', bookingController.getBookingSeatById)
Route.post(
  '/book',
  authMiddleware.authentication,
  redisMiddleware.clearDataBookingRedis,
  bookingController.postBooking
)

module.exports = Route
