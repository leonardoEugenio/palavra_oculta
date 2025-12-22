import jwt, { type SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 60 * 60 * 24 * 7 as number

export function generateAccessToken (userId: string) {
  const payload = {
    sub: userId,
  }

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as number,
  }

  return jwt.sign(payload, JWT_SECRET, options)
}
