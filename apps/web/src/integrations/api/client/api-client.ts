import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Content-Type', 'application/json')
      },
    ],
  },
})
