const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//haetaan käyttäjien tiedot
usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users)
})
//käyttäjän lisäys
usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (request.body.username === undefined || request.body.password === undefined ) {
      return response.status(400).json({ error: 'content missing' })
    
    } else if ( request.body.username.length < 3 || request.body.password.length < 3){
    return response.status(400).json({ error: 'username and password must be 3 or longer' })
  }
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {
    next(error)
  }
  })
  module.exports = usersRouter