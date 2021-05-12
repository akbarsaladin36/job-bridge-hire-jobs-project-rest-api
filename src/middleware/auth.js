const helper = require('../helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
      token = token.split(' ')[1]
      // proses validasi token
      jwt.verify(token, process.env.PRIVATE_KEY, (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          // console.log('LOLOS !')
          req.decodeToken = result
          if (req.decodeToken.is_verified === 0) {
            return helper.response(res, 403, 'Please verify your email first !')
          }
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please login first !')
    }
  }
}
