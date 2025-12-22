import fp from 'fastify-plugin'
import { Pool } from 'pg'

export default fp(async (app) => {
  const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  })

  // Testa conexão ao subir
  await pool.query('select 1')

  app.decorate('pg', pool)

  app.addHook('onClose', async () => {
    await pool.end()
  })
})
