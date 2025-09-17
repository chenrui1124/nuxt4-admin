import type { Role, SafeUser, UnsafeUser } from './types/models'

import { faker, fakerZH_CN } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

const generateAvatar = () =>
  `https://avatar.iran.liara.run/public/${faker.number.int({ min: 10, max: 99 })}`

const roles = [
  {
    id: nanoid(),
    name: 'admin',
    createdAt: new Date(),
  },
  {
    id: nanoid(),
    name: 'user',
    createdAt: new Date(),
  },
] satisfies Role[]

const authUser: UnsafeUser = {
  id: nanoid(),
  username: 'admin',
  password: bcrypt.hashSync('12345678', 10),
  createdAt: new Date(),
  email: 'example@example.com',
  name: fakerZH_CN.person.fullName(),
  avatar: generateAvatar(),
  roleId: roles.find(role => role.name === 'admin')!.id,
}

const { password, ...safeAuthUser } = authUser

const users: SafeUser[] = [
  safeAuthUser,
  ...Array.from({ length: 100 }).map<SafeUser>(() => ({
    id: nanoid(),
    username: faker.internet.username(),
    createdAt: new Date(),
    name: fakerZH_CN.person.fullName(),
    email: faker.internet.email(),
    avatar: `https://avatar.iran.liara.run/public/${faker.number.int({ min: 10, max: 99 })}`,
    roleId: roles.find(role => role.name === 'user')!.id,
  })),
]

export const mocks = {
  roles,
  authUser,
  users,
}
