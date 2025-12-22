import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import argon2 from 'argon2'
import { generateAccessToken } from '../../lib/jwt'

export default async function authLoginRoute (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              email: z.string().email(),
              userName: z.string(),
            }),
            accessToken: z.string(),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const result = await app.pg.query(
        `
        SELECT id, email, user_name, password
        FROM users
        WHERE email = $1
        `,
        [email]
      )

      if (result.rowCount === 0) {
        return reply.code(401).send({
          error: 'Invalid email or password',
        })
      }

      const user = result.rows[0]

      const passwordMatch = await argon2.verify(
        user.password,
        password
      )

      if (!passwordMatch) {
        return reply.code(401).send({
          error: 'Invalid email or password',
        })
      }

      const accessToken = generateAccessToken(user.id)

      return reply.code(200).send({
        user: {
          id: user.id,
          email: user.email,
          userName: user.user_name,
        },
        accessToken,
      })
    }
  )
}
