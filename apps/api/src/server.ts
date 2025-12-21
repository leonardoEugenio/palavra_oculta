import Fastify from 'fastify'

const app = Fastify()

app.get('/health', async () => {
  return { ok: true }
})

app.listen({ port: 3333 })
