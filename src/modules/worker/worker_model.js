const connection = require('../../config/mysql')

module.exports = {
  getWorker: (sortBy, search, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM worker w JOIN skill s ON w.id_worker = s.id_worker WHERE s.name_skill LIKE ? GROUP BY w.id_worker ${sortBy} LIMIT ? OFFSET ?`,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM worker w JOIN skill s ON w.id_worker = s.id_worker WHERE s.name_skill LIKE ? GROUP BY w.id_worker',
        search,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getWorkerById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM worker WHERE id_worker = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getWorkerByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM worker WHERE email_worker = ?',
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getAttributeWorker: (attribute, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${attribute} WHERE id_worker = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addAttributeWorker: (attribute, setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ${attribute} SET ?`,
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateWorker: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE worker SET ? WHERE id_worker = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  deleteSkillWorker: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM skill WHERE id_worker = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
