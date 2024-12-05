const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const loginRouter = require('./controllers/login')
const incomesRouter = require('./controllers/incomes')
const usersRouter = require('./controllers/users')
const tasksRouter = require('./controllers/tasks')
const quotesRouter = require('./controllers/quotes')
const middleware = require('./utils/tokenseparator')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
require('express-async-errors')
const app = express()

//mongodb yhteys
mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.tokenSeparator)

app.use('/api/login', loginRouter)
app.use('/api/incomes',incomesRouter)
app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/quotes', quotesRouter)

module.exports = app