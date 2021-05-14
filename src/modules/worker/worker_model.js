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

  getSkillWorker: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT name_skill FROM skill WHERE id_worker = ?',
        id,
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
  }
}
