import Fastify from 'fastify'
import { databasePlugin } from './plugins/database.js'

export const app = Fastify()

app.register(databasePlugin)
