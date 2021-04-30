const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')
const {
  register,
  login,
  requestChange,
  changeData
} = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.post('/request-change', authMiddleware.authentication, requestChange)
Route.post('/change-data/:token', changeData)

module.exports = Route
