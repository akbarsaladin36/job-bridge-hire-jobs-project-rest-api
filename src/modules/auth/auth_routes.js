const express = require('express')
const Route = express.Router()
const authController = require('./auth_controller')

Route.post('/register-worker', authController.registerWorker)
Route.post('/login-worker', authController.loginWorker)
Route.get('/verify-worker/:id', authController.verifyWorker)

Route.post('/register-company', authController.registerCompany)
Route.post('/login-company', authController.loginCompany)
Route.get('/verify-company/:id', authController.verifyCompany)

Route.patch('/request-otp', authController.reqOtp)
Route.patch('/reset-password', authController.resetPassword)

module.exports = Route
