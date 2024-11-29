const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('MOI SIRPALEENA JA VILMIS')
});

module.exports = app