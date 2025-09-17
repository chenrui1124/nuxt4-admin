export interface UnsafeUser {
  id: string
  username: string
  password: string
  createdAt: Date
  name: string
  email: string
  avatar?: string
}

export type SafeUser = Omit<UnsafeUser, 'password'>
