import { api } from '@/integrations/api/client/api-client'
import type { UserAuthResponse } from '@/types/auth'

export async function postLogin ({ email, password }: { email: string, password: string }) {
  const response = await api.post('auth/login', {
    json: {
      email,
      password,
    }
  })

  const data = await response.json<UserAuthResponse>()

  return {
    status: response.status,
    data,
  }
}
