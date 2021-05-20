const helper = require('./../../helpers/index')
const recruiterModel = require('./recruiter_model')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await recruiterModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success', result)
      } else {
        return helper.response(res, 404, 'Not found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  createRecruiter: async (req, res) => {
    try {
      const {
        representationName,
        position,
        email,
        password,
        companyName,
        field,
        city,
        description,
        companyEmail,
        instagram,
        phoneNumber,
        linkedIn
      } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptedPassword = bcrypt.hashSync(password, salt)
      const setData = {
        is_verified: 0,
        fullname_representation_company: representationName,
        position_representation_company: position,
        email_representation_company: email,
        password_company: encryptedPassword,
        company_name: companyName,
        company_field: field,
        company_city: city,
        company_desc: description,
        company_email: companyEmail,
        company_instagram: instagram,
        company_phone_number: phoneNumber,
        company_linkedin: linkedIn,
        company_image: req.file ? req.file.filename : ''
      }
      const result = await recruiterModel.createRecruiter(setData)
      return helper.response(res, 200, 'Data created', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  updateRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await recruiterModel.getDataById(id)
      // console.log(isExist[0].company_name)
      const {
        companyName,
        field,
        city,
        description,
        companyEmail,
        instagram,
        phoneNumber,
        linkedIn
      } = req.body
      const setData = {
        company_name: companyName,
        company_field: field,
        company_city: city,
        company_desc: description,
        company_email: companyEmail,
        company_instagram: instagram,
        company_phone_number: phoneNumber,
        company_linkedin: linkedIn,
        company_image: req.file ? req.file.filename : '',
        company_updated_at: new Date(Date.now())
      }
      if (isExist.length === 0) {
        return helper.response(res, 404, 'Id does not exist', null)
      } else {
        const result = recruiterModel.updateRecruiter(setData, id)
        return helper.response(res, 200, 'Data updated', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  deleteRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await recruiterModel.getDataById(id)
      if (isExist.length > 0) {
        const result = await recruiterModel.deleteRecruiter(id)
        return helper.response(res, 200, 'Data deleted', result)
      } else {
        return helper.response(res, 404, 'Data not found')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  passChangeRequest: async (req, res) => {
    try {
      const { email } = req.body
      const isExist = await recruiterModel.getDataByEmail(email)
      if (isExist.length === 0) {
        return helper.response(res, 404, 'Cannot update empty data', null)
      } else {
        const token = Math.ceil(Math.random() * 9001) + 998
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.email,
            pass: process.env.emailPass
          }
        })
        const mailOptions = {
          from: 'thisisoxlade@gmail.com',
          to: isExist[0].email_representation_company,
          subject: 'your reset password otp',
          html: `
          <h1>Your reset password token</h1>
          <p>Use '${token}' to reset your password.</p>
          <p>Token will automatically expired in 5 minutes.</p>
          `
        }
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw err
          console.log('email sent: ' + info.response)
        })
        const id = isExist[0].id_company
        const setData = {
          company_updated_at: new Date(Date.now()),
          reset_token: token
        }
        const result = await recruiterModel.updateRecruiter(setData, id)
        return helper.response(res, 200, 'OTP sent', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  passChange: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body
      const isExist = await recruiterModel.getDataByEmail(email)
      if (isExist.length === 0) {
        return helper.response(res, 404, 'Cannot update empty data', null)
      } else {
        const isExpired = new Date(Date.now()) - isExist[0].company_updated_at
        // console.log(isExpired)
        if (otp !== isExist[0].reset_token || isExpired > 300000) {
          // console.log(req.body)
          return helper.response(
            res,
            300,
            'Otp mismatch or token invalid',
            null
          )
        } else {
          const id = isExist[0].id_company
          const setData = {
            password_company: newPassword
          }
          const result = await recruiterModel.updateRecruiter(setData, id)
          return helper.response(res, 200, 'Password changed', result)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
