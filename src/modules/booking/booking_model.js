const connection = require('../../config/mysql')

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT b.booking_id, b.premiere_id, b.booking_ticket, b.booking_total_price, b.booking_payment_method, b.booking_status, bs.booking_seat_location FROM booking b INNER JOIN booking_seat bs ON b.booking_id = bs.booking_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  }
}
