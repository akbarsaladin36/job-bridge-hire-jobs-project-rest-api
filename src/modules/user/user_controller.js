const helper = require('../../helpers/wrapper')
const userModel = require('./user_model')

module.exports = {
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.decodeToken.user_id

      const { userName, userPhoneNumber } = req.body
      const setData = {
        user_name: userName,
        user_phone_number: userPhoneNumber
      }
      // console.log('Data', setData)

      const result = await userModel.updateProfile(setData, userId)
      return helper.response(
        res,
        200,
        'Succes Update Profile (Please get New token) !',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
