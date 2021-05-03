const helper = require('../../helpers')
const userModel = require('./user_model')

module.exports = {
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.decodeToken.user_id
      const userProfileImage = req.decodeToken.user_profile_image

      const { firstName, lastName, userPhoneNumber } = req.body
      const setData = {
        user_name: firstName + ' ' + lastName,
        user_phone_number: userPhoneNumber,
        user_profile_image: req.file ? req.file.filename : ''
      }
      // console.log('Data', setData)

      const imgLoc = `src/uploads/${userProfileImage}`
      helper.deleteImage(imgLoc)

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
