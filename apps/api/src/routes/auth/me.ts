import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export default async function authMeRoute (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/auth/me',
    {
      config: {
        auth: true,
        swagger: {
          security: [{ bearerAuth: [] }],
        },
      },
      schema: {
        tags: ['Auth'],
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              email: z.string().email(),
              userName: z.string(),
              avatar: z.string().url(),
            }),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.userId

      if (!userId) {
        return reply.code(401).send({
          error: 'Unauthorized',
        })
      }

      const result = await app.pg.query(
        `
        SELECT id, email, user_name, avatar
        FROM users
        WHERE id = $1
        `,
        [userId]
      )

      if (result.rowCount === 0) {
        return reply.code(401).send({
          error: 'Unauthorized',
        })
      }

      const user = result.rows[0]

      return reply.code(200).send({
        user: {
          id: user.id,
          email: user.email,
          userName: user.user_name,
          avatar: user.avatar
        },
      })
    }
  )
}
