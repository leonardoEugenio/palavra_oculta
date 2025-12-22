import fp from 'fastify-plugin'
import type { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string

export default fp(async (app) => {
  app.decorateRequest('userId', undefined)

  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const publicPaths = ['/docs', '/docs/json', '/']

    if (publicPaths.some(path => request.url.startsWith(path))) {
      return
    }

    if (request.routeOptions.config?.auth === false) {
      return
    }

    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const [type, token] = authHeader.split(' ')

    if (type !== 'Bearer' || !token) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { sub: string }
      request.userId = decoded.sub
    } catch {
      return reply.code(401).send({ error: 'Invalid token' })
    }
  })
})
