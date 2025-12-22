import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import argon2 from 'argon2'
import { generateAccessToken } from '../../lib/jwt'

export default async function authRegisterUserRoute (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/register',
    {
      config: {
        auth: false,
      },
      schema: {
        tags: ['Auth'],

        body: z.object({
          userName: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(8),
          avatar: z.string().url().optional(),
        }),

        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              email: z.string().email(),
              userName: z.string(),
            }),
            accessToken: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userName, email, password, avatar } = request.body

      const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id,
      })

      const result = await app.pg.query(
        `
        INSERT INTO users (user_name, avatar, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, user_name
        `,
        [userName, avatar, email, hashPassword]
      )

      const user = result.rows[0]

      const accessToken = generateAccessToken(user.id)

      return reply.code(201).send({
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
