const tasksRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Task = require('../models/task')
const User = require('../models/user')


tasksRouter.get('/', async (request, response) => {
    const tasks = await Task.find({}).populate('user', { username: 1, name: 1 })
    response.json(tasks)
  })

  
  tasksRouter.post('/', async (request, response) => {
    const body = request.body
  
    const decodedToken = jwt.verify(request.token, process.env.SECRET) 
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const newtask = new Task({
      title: body.title,
      user: user.id
    })
    const savedTask= await newtask.save()
    user.tasks = user.tasks.concat(savedTask.id)
    await user.save()

    response.status(201).json(savedTask)
  })

  module.exports = tasksRouter
  