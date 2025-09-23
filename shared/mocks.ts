import { faker, fakerZH_CN } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { cloneDeep, omit } from 'es-toolkit'
import { nanoid } from 'nanoid'
import type { RoleSelectModel, SafeUserSelectModel, UserSelectModel } from './types/models'

function generateAvatar() {
  return `https://avatar.iran.liara.run/public/${faker.number.int({ min: 10, max: 99 })}`
}

const initialRoles: RoleSelectModel[] = [
  {
    id: nanoid(),
    name: 'admin',
    enabled: true,
    createdAt: new Date(),
  },
  {
    id: nanoid(),
    name: 'user',
    enabled: true,
    createdAt: new Date(),
  },
]

const authUser: UserSelectModel = Object.freeze({
  id: nanoid(),
  username: 'admin',
  hashedPassword: bcrypt.hashSync('12345678', 10),
  createdAt: new Date(),
  email: 'admin@example.com',
  name: fakerZH_CN.person.fullName(),
  avatar: generateAvatar(),
  roleId: initialRoles.find(role => role.name === 'admin')!.id,
})

class Users {
  private _md: MockData

  constructor(mockData: MockData) {
    this._md = mockData
  }

  private _data: SafeUserSelectModel[] = Array.from({ length: 99 }).map(() => ({
    id: nanoid(),
    username: faker.internet.username(),
    createdAt: new Date(),
    name: fakerZH_CN.person.fullName(),
    email: faker.internet.email(),
    roleId: initialRoles.find(role => role.name === 'user')!.id,
    avatar: generateAvatar(),
  }))

  findMany() {
    const result = [omit(authUser, ['hashedPassword']), ...this._data]
    const roles = this._md.roles.findMany()
    return result.map(user => ({
      ...user,
      role: {
        name: roles.find(role => role.id === user.roleId)!.name,
      },
    }))
  }
}

class Roles {
  private _md: MockData

  constructor(mockData: MockData) {
    this._md = mockData
  }

  private _data: RoleSelectModel[] = cloneDeep(initialRoles)

  findMany() {
    return this._data
  }
}

class MockData {
  users = new Users(this)

  roles = new Roles(this)
}

const mockDatabase = new Map<string, MockData>()

export function useMockAuthUser() {
  return authUser
}

export function useMockDatabase(id: string) {
  if (!mockDatabase.has(id)) {
    mockDatabase.set(id, new MockData())
  }
  return mockDatabase.get(id)!
}
