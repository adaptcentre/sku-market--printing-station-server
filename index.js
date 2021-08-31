import { logger } from './src/utils/logger.js'
import { app } from './src/app.js'

const port = process.env.PORT || 4000

start()

async function start() {  
  app.listen(port, () => {
    logger.info(`-----------------------------------------------`)
    logger.info(`App running on port ${port} 🚀`)
    logger.info(`Mode: ${process.env.NODE_ENV || 'development'}`)
    logger.info(`-----------------------------------------------`)
  })
}