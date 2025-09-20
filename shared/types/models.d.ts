export interface UnsafeUser {
  id: string
  username: string
  password: string
  createdAt: Date
  name: string
  email: string
  avatar?: string
  roleId: string
}

export type SafeUser = Omit<UnsafeUser, 'password'>

export interface Role {
  id: string
  name: string
  enabled: boolean
  createdAt: Date
}
