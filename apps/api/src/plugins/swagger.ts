import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { PORT } from '../server.js'

async function swaggerPlugin (fastify) {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Palavra Oculta API',
        description: 'API do jogo Palavra Oculta',
        version: '1.0.0'
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Ambiente para consular os endpoints da API'
        }
      ]
    }
  })

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  })
}

export default fp(swaggerPlugin)
