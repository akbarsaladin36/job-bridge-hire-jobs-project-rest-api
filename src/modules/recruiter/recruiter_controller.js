const helper = require('./../../helpers/index')
const recruiterModel = require('./recruiter_model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await recruiterModel.getDataById(id)
      if (result.length > 0) {
        client.setex(`getcompany:${id}`, 3600, JSON.stringify(result))
        return helper.response(res, 200, 'Success', result)
      } else {
        return helper.response(res, 404, 'Not found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },

  updateRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await recruiterModel.getDataById(id)

      const {
        companyName,
        companyField,
        companyCity,
        companyDescription,
        companyEmail,
        companyInstagram,
        companyPhoneNumber,
        companyLinkedIn
      } = req.body
      const setData = {
        company_name: companyName,
        company_field: companyField,
        company_city: companyCity,
        company_desc: companyDescription,
        company_email: companyEmail,
        company_instagram: companyInstagram,
        company_phone_number: companyPhoneNumber,
        company_linkedin: companyLinkedIn,
        company_image: req.file ? req.file.filename : isExist[0].company_image,
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

      if (isExist.length === 0) {
        return helper.response(res, 404, 'Id does not exist', null)
      } else {
        const result = await recruiterModel.updateRecruiter(setData, id)
        return helper.response(res, 200, 'Data updated', result)
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
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
