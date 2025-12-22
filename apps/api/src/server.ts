import { buildApp } from './app'

const app = buildApp()

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('🚀 Server running on http://localhost:3333')
})
