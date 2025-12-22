import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import cors from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'
import postgresPlugin from './plugins/postgres'

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import authHook from './hooks/auth'

import authRegisterUserRoute from './routes/auth/register-user'
import authLoginRoute from './routes/auth/login'
import authMeRoute from './routes/auth/me'

export function buildApp () {
  const app = Fastify().withTypeProvider<ZodTypeProvider>()
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)
  app.register(postgresPlugin)

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

  app.register(authHook)

  app.register(authRegisterUserRoute)
  app.register(authLoginRoute)
  app.register(authMeRoute)

  return app
}
