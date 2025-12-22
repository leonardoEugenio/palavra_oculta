import Fastify from 'fastify'
import { databasePlugin } from './plugins/database.js'
import swaggerPlugin from './plugins/swagger.js'

export const app = Fastify({
  logger: true
})

// Plugins
app.register(databasePlugin)
app.register(swaggerPlugin)
