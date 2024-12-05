const quotesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Quote = require('../models/quote')
const User = require('../models/user')


quotesRouter.get('/', async (request, response) => {
    const quotes = await Quote.find({})
    response.json(quotes)
  })

quotesRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET) 
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
   

    const newQuote = new Quote({
      quote: body.quote,
    })
    const savedQuote = await newQuote.save()
    response.status(201).json(savedQuote)
  })

  module.exports = quotesRouter
  