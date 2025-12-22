import type { FastifyInstance } from 'fastify'

export default async function dbRoutes (app: FastifyInstance) {
  app.get('/db/health', async () => {
    const result = await app.pg.query('select now() as now')

    return {
      status: 'ok',
      databaseTime: result.rows[0].now,
    }
  })
}
