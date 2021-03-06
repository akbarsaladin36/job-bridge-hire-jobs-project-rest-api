const helper = require('./../../helpers/index')
const recruiterModel = require('./recruiter_model')
const redis = require('redis')
const bcrypt = require('bcrypt')
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
  },

  changePasswordRecruiter: async (req, res) => {
    try {
      const { id } = req.decodeToken.id_company
      const { newPassword, confirmNewPassword } = req.body

      if (newPassword === confirmNewPassword) {
        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(newPassword, salt)
        const setData = {
          password_company: hashed,
          company_updated_at: new Date(Date.now())
        }
        const result = await recruiterModel.updateRecruiter(setData, id)
        delete result.password_company

        return helper.response(res, 200, 'Password Changed', result)
      }
      return helper.response(res, 300, 'Password Mismatch')
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
