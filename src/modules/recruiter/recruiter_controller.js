const helper = require('./../../helpers/index')
const recruiterModel = require('./recruiter_model')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const redis = require('redis')
const client = redis.createClient()
require('dotenv').config()

module.exports = {
  getRecruiterById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await recruiterModel.getDataById(id)

      if (result.length === 0) {
        return helper.response(res, 404, `recruiter id ${id} not found`, null)
      } else {
        delete result[0].password_company
        client.setex(`getRecruiter:${id}`, 3600, JSON.stringify(result))

        return helper.response(res, 200, `recruiter id ${id} found`, result)
      }
    } catch (error) {
      return helper.response(res, 400, 'bad request', Error)
    }
  },

  updateRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await recruiterModel.getDataById(id)

      if (isExist.length === 0) {
        return helper.response(res, 404, 'cannot update empty field', null)
      } else {
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
          company_image: req.file
            ? req.file.filename
            : isExist[0].company_image,
          company_updated_at: new Date(Date.now())
        }

        if (req.file) {
          console.log('ada file')
          if (isExist[0].company_image.length > 0) {
            console.log(`Delete Image${isExist[0].company_image}`)
            const imgLoc = `src/uploads/${isExist[0].company_image}`
            helper.deleteImage(imgLoc)
          } else {
            console.log('NO img in DB')
          }
        }

        const result = await recruiterModel.updateRecruiter(setData, id)
        return helper.response(res, 200, 'success update data', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'bad request', Error)
    }
  },

  deleteRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await recruiterModel.getDataById(id)

      if (isExist.length === 0) {
        return helper.response(res, 404, 'cannot delete empty data')
      } else {
        helper.deleteImage(isExist[0].company_image)
        const result = await recruiterModel.deleteRecruiter(id)

        return helper.response(res, 200, 'data deleted', result || null)
      }
    } catch (error) {
      return helper.response(res, 400, 'bad request', Error)
    }
  },

  passChangeRequest: async (req, res) => {
    try {
      const { email } = req.body
      const isExist = await recruiterModel.getDataByEmail(email)

      if (isExist.length === 0) {
        return helper.response(res, 404, 'Email not recognized', null)
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

  changePassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptedPassword = bcrypt.hashSync(newPassword, salt)
      const isExist = await recruiterModel.getDataByEmail(email)

      if (isExist.length === 0) {
        return helper.response(res, 404, 'Email not recognized', null)
      } else {
        const isExpired = new Date(Date.now()) - isExist[0].company_updated_at
        if (otp !== isExist[0].reset_token || isExpired > 300000) {
          console.log(isExist[0].reset_token)
          console.log(otp)
          return helper.response(
            res,
            300,
            'Otp mismatch or has been expired',
            null
          )
        } else {
          const id = isExist[0].id_company
          const setData = {
            password_company: encryptedPassword,
            company_updated_at: new Date(Date.now())
          }
          const result = await recruiterModel.updateRecruiter(setData, id)
          return helper.response(res, 200, 'Password changed', result)
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', Error)
    }
  },

  hireWorker: async (req, res) => {
    try {
      // console.log(req.body)
      const { workerEmail, companyName, title, msg } = req.body
      helper.hireViaEmail(title, companyName, msg, workerEmail)
      return helper.response(res, 200, 'email sent', null)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
