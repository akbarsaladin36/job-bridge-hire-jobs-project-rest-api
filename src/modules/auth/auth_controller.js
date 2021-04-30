const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      // console.log(req.body)
      const { userEmail, userPassword, userName, userPhoneNumber } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`before Encrypt = ${userPassword}`)
      console.log(`after Encrypt = ${encryptPassword}`)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_phone_number: userPhoneNumber
      }
      // kondisi cek email adata tidak dalam database
      // jika ada kasih respon gagal
      // jika tidak ada jalakan model create user
      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })

      if (checkEmailUser.length === 0) {
        const result = await authModel.register(setData)
        delete result.user_password
        return helper.response(res, 200, 'Succes register User', result)
      } else {
        return helper.response(res, 400, 'Email has been registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  login: async (req, res) => {
    try {
      // console.log(req.body)
      const { userEmail, userPassword } = req.body
      // 1. cek email ada di db atau tidak
      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      // console.log(checkEmailUser)
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        // console.log(cekPassword)
        if (checkPassword) {
          console.log('User berhasil login')
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          // console.log(token)
          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes Login !', result)
        } else {
          return helper.response(res, 400, 'Worng password')
        }
      } else {
        return helper.response(res, 404, 'Email not Registed')
      }
      // 2. cek pass sama atau tidak
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  changeData: async (req, res) => {
    try {
      let token = req.params.token
      // console.log('Token Masuk', token)

      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          // console.log('DECODE token', result)
          token = result
        }
      })
      // console.log('DATA LEMPAR', token)
      const { userId, setData } = token

      if (userId && setData) {
        console.log('Update', setData)
        const result = await authModel.updateData(setData, userId)
        return helper.response(res, 200, 'succes update data', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  requestChange: async (req, res) => {
    try {
      if (req.body.userPassword) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(req.body.userPassword, salt)
        req.body.userPassword = encryptPassword
      }
      // console.log('PASSS', req.body.userPassword)

      const setData = {}
      for (const key in req.body) {
        setData[helper.convertToSnakeCase(key)] = req.body[key]
      }
      console.log('SETDATA', setData)

      const payload = {
        userId: req.decodeToken.user_id,
        setData: setData
      }
      // console.log(payload)
      const token = jwt.sign({ ...payload }, 'RAHASIA', {
        expiresIn: '24h'
      })
      const url = `http://localhost:3001/api/v1/auth/change-data/${token}`

      // send email for verificatioan here

      return helper.response(
        res,
        200,
        'Email verification has been sent, please check your email !',
        url
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
