import { isEmail } from 'validator'

// Utility type for branding
type Brand<K,T> = K & {_brand: T}

// EmailType definition
export type EmailType = Brand<string, 'Email'>

export function verifyEmail(email: string): boolean {
  return isEmail(email)
}
