const helper = require('./../../helpers/index')
const recruiterModel = require('./recruiter_model')

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
      const setData = {
        is_verified: 0,
        fullname_representation_company: representationName,
        position_representation_company: position,
        email_representation_company: email,
        password_company: password,
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
      const setData = {
        is_verified: 0,
        fullname_representation_company: representationName,
        position_representation_company: position,
        email_representation_company: email,
        password_company: password,
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
  }

}
