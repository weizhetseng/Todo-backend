const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

require('./connection/mongoDB')
require('./connection/firebase')

const todosRouter = require('./routes/todos')
const usersRouter = require('./routes/users')
const uploadRouter = require('./routes/upload')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(helmet())

app.use('/todos', todosRouter)
app.use('/users', usersRouter)
app.use('/upload', uploadRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500).send(`<h1>${err.message}</h1>`)
})

module.exports = app
