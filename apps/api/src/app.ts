import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import cors from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

export function buildApp () {
  const app = Fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(cors)

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Palavra Oculta API',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(ScalarApiReference, {
    routePrefix: '/docs',
  })

  return app
}
