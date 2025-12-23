import type { ErrosRequest } from '@/types/errosRequest'

export type UserAuthResponse = {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
  }
}
