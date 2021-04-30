const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')
const authMiddleware = require('../../middleware/auth')

Route.post('/', authMiddleware.authentication, userController.updateUserProfile)

module.exports = Route
