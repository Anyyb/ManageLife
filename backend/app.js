const express = require('express')
const config = require('./utils/config')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')

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

app.get('/', (req, res) => {
  res.send('MOI SIRPALEENA JA VILMIS')
});

module.exports = app