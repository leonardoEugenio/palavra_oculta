import { pool } from '../config/database.js'

export async function databasePlugin (fastify) {
  fastify.decorate('db', pool)

  fastify.addHook('onClose', async () => {
    await pool.end()
  })
}
