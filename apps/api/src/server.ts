import { app } from './app.js'

export const PORT = Number(process.env.PORT) || 3333

app.listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
