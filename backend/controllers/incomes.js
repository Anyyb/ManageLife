const incomesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Income = require('../models/income')
const User = require('../models/user')

incomesRouter.get('/', async (request, response) => {
    const incomes = await Income.find({}).populate('user', { username: 1, name: 1 })
    response.json(incomes)
})

incomesRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const newincome = new Income({
        title: body.title,
        income: body.income,
        user: user.id
    })
    const savedIncome = await newincome.save()
    user.incomes = user.incomes.concat(savedIncome.id)
    await user.save()

    response.status(201).json(savedIncome)
})
module.exports = incomesRouter

