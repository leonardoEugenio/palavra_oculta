import { Pool } from 'pg'

export declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool
    userId?: string
  }
}

declare module 'fastify' {
  interface FastifyContextConfig {
    auth?: boolean
  }
}
