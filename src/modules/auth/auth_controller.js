const helper = require('../../helpers')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
  registerWorker: async (req, res) => {
    try {
      // console.log(req.body)
      const { passwordWorker, emailWorker } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(passwordWorker, salt)
      let setData = {}
      for (const key in req.body) {
        setData = {
          ...setData,
          [helper.convertToSnakeCase(key)]: req.body[key]
        }
      }
      setData = {
        ...setData,
        is_verified: '0',
        password_worker: encryptPassword,
        image_worker: ''
      }
      // console.log(setData)
      const checkEmailWorker = await authModel.getDataCondition('worker', {
        email_worker: emailWorker
      })

      if (checkEmailWorker.length === 0) {
        console.log(setData)
        const result = await authModel.register('worker', setData)
        delete result.password_worker
        const url = `http://localhost:3001/api/v1/auth/verify-worker/${result.id}`
        helper.sendMail('Please activate your account', url, emailWorker, 'verification', null)
        return helper.response(
          res,
          200,
          'Succes register User Please Check your Email to Activate your Account !',
          result
        )
      } else {
        return helper.response(res, 400, 'Email has been registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  registerCompany: async (req, res) => {
    try {
      // console.log(req.body)
      const { passwordCompany, emailRepresentationCompany, companyEmail } =
        req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(passwordCompany, salt)
      let setData = {}
      for (const key in req.body) {
        setData = {
          ...setData,
          [helper.convertToSnakeCase(key)]: req.body[key]
        }
      }
      setData = {
        ...setData,
        is_verified: '0',
        password_company: encryptPassword,
        company_image: ''
      }
      // console.log(setData)
      const checkEmailCompany = await authModel.getDataCondition('company', {
        company_email: companyEmail
      })
      const checkEmailRepresentationCompany = await authModel.getDataCondition(
        'company',
        {
          email_representation_company: emailRepresentationCompany
        }
      )

      if (
        checkEmailCompany.length === 0 &&
        checkEmailRepresentationCompany.length === 0
      ) {
        console.log(setData)
        const result = await authModel.register('company', setData)
        delete result.password_company
        const url = `http://localhost:3001/api/v1/auth/verify-company/${result.id}`
        helper.sendMail('Please activate your account', url, emailRepresentationCompany, 'verification', null)
        return helper.response(
          res,
          200,
          'Succes register User Please Check your Email to Activate your Account !',
          result
        )
      } else {
        return helper.response(res, 400, 'Email has been registered')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  verifyWorker: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await authModel.changeData(
        'worker',
        { is_verified: '1' },
        id
      )
      return helper.response(res, 200, 'Succes Activate your Account !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  verifyCompany: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await authModel.changeData(
        'company',
        { is_verified: '1' },
        id
      )
      return helper.response(res, 200, 'Succes Activate your Account !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  loginWorker: async (req, res) => {
    try {
      // console.log(req.body)
      const { passwordWorker, emailWorker } = req.body
      const checkEmailWorker = await authModel.getDataCondition('worker', {
        email_worker: emailWorker
      })

      if (checkEmailWorker.length > 0) {
        if (checkEmailWorker[0].is_verified === '0') {
          return helper.response(res, 403, 'Account is not verified')
        }

        const checkPassword = bcrypt.compareSync(
          passwordWorker,
          checkEmailWorker[0].password_worker
        )

        if (checkPassword) {
          console.log('User berhasil login')
          const payload = checkEmailWorker[0]
          delete payload.password_worker
          const token = jwt.sign({ ...payload }, process.env.PRIVATE_KEY, {
            expiresIn: '24h'
          })

          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes Login !', result)
        } else {
          return helper.response(res, 400, 'Worng password')
        }
      } else {
        return helper.response(res, 404, 'Email not Registed')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  loginCompany: async (req, res) => {
    try {
      // console.log(req.body)
      const { passwordCompany, emailRepresentationCompany } = req.body
      const checkEmailCompany = await authModel.getDataCondition('company', {
        email_representation_company: emailRepresentationCompany
      })

      if (checkEmailCompany.length > 0) {
        if (checkEmailCompany[0].is_verified === '0') {
          return helper.response(res, 403, 'Account is not verified')
        }

        const checkPassword = bcrypt.compareSync(
          passwordCompany,
          checkEmailCompany[0].password_company
        )

        if (checkPassword) {
          console.log('User berhasil login')
          const payload = checkEmailCompany[0]
          delete payload.password_company
          const token = jwt.sign({ ...payload }, process.env.PRIVATE_KEY, {
            expiresIn: '24h'
          })

          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes Login !', result)
        } else {
          return helper.response(res, 400, 'Worng password')
        }
      } else {
        return helper.response(res, 404, 'Email not Registed')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  reqOtp: async (req, res) => {
    try {
      const { email } = req.body
      const otp = Math.ceil(Math.random() * 9001) + 998
      const isRecruiter = await authModel
        .getDataCondition(
          'company',
          { email_representation_company: email }
        )
      const isWorker = await authModel
        .getDataCondition(
          'worker',
          { email_worker: email }
        )
      if (isRecruiter.length > 0 || isWorker.length > 0) {
        const worker = isWorker.length > 0
        const id = worker
          ? isWorker[0].id_worker
          : isRecruiter[0].id_company
        const setData = {
          reset_token: otp
        }

        await helper.sendMail(
          'Job Bridge OTP',
          null,
          email,
          'Forget Password',
          otp
        )

        if (worker) {
          setData.worker_updated_at = new Date(Date.now())
          const result = await authModel.changeData(
            'worker',
            setData,
            id
          )
          return helper.response(res, 200, 'Otp sent to worker email', result)
        } else {
          setData.company_updated_at = new Date(Date.now())
          const result = await authModel.changeData(
            'company',
            setData,
            id
          )
          return helper.response(res, 200, 'Otp sent to company representative email', result)
        }
      } else {
        return helper.response(res, 404, 'Email not registered')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', error)
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body
      const isRecruiter = await authModel
        .getDataCondition(
          'company',
          { email_representation_company: email }
        )
      const isWorker = await authModel
        .getDataCondition(
          'worker',
          { email_worker: email }
        )
      if (isRecruiter.length > 0 || isWorker.length > 0) {
        const worker = isWorker.length > 0
        const data = worker
          ? {
              id: isWorker[0].id_worker,
              token: isWorker[0].reset_token,
              updatedAt: isWorker[0].worker_updated_at
            }
          : {
              id: isRecruiter[0].id_company,
              token: isRecruiter[0].reset_token,
              updatedAt: isRecruiter[0].company_updated_at
            }
        const timeSpan = Math.floor((new Date(Date.now()) - data.updatedAt) / 60000)

        if (data.token === +otp && timeSpan <= 5) {
          const result = worker
            ? await authModel.changeData(
              'worker',
              {
                password_worker: bcrypt.hashSync(newPassword, 10),
                worker_updated_at: new Date(Date.now())
              },
              data.id
            )
            : await authModel.changeData(
              'company',
              {
                password_company: bcrypt.hashSync(newPassword, 10),
                company_updated_at: new Date(Date.now())
              },
              data.id
            )
          delete result.password_worker
          delete result.password_company

          return helper.response(res, 200, 'Password changed', result)
        } else {
          return helper.response(res, 300, 'OTP Expired or mismatch')
        }

        // console.log(data)
        // const id = worker
        //   ? isWorker[0].worker_id
        //   : isRecruiter[0].company_id
        // let timeSpan = worker
        //   ? isWorker[0].worker_updated_at
        //   : isWorker[0].company_updated_at
        // let token = wor
      } else {
        return helper.response(res, 404, 'Email not registered', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', error)
    }
  }

}
