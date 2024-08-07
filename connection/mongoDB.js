const mongoose = require('mongoose')
require('dotenv').config('./.env')

const DATAURL = `${process.env.DATABASE_URL}`
  .replace('<user>', process.env.DATABASE_USER)
  .replace('<password>', process.env.DATABASE_PASSWORD)

const connect = async () => {
  try {
    await mongoose.connect(DATAURL)
    console.log('MongoDB connected...')
  } catch (error) {
    console.log(error)
  }
}

connect()

module.exports = connect
