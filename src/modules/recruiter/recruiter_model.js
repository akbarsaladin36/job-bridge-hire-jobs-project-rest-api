const connection = require('../../config/mysql')

module.exports = {
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SElECT * FROM company WHERE id_company = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SElECT * FROM company WHERE email_representation_company = ?',
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createRecruiter: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO company SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id_company: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  updateRecruiter: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE company SET ? WHERE id_company = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  deleteRecruiter: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM company WHERE id_company = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
