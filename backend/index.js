const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server is running on http://localhost:${config.PORT}`)
  logger.info(`Server is running on http://localhost:${config.PORT}/api/users`)
  logger.info(`Server is running on http://localhost:${config.PORT}/api/incomes`)
  logger.info(`Server is running on http://localhost:${config.PORT}/api/tasks`)
  logger.info(`Server is running on http://localhost:${config.PORT}/api/quotes`)
})