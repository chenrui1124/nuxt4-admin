import { faker, fakerZH_CN } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { cloneDeep, omit } from 'es-toolkit'
import { nanoid } from 'nanoid'
import type {
  DefaultRoleSelectModel,
  RoleSelectModel,
  SafeUserSelectModel,
  UserSelectModel,
} from './types/models'

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
  passwordHash: bcrypt.hashSync('12345678', 10),
  createdAt: new Date(),
  email: 'admin@example.com',
  name: fakerZH_CN.person.fullName(),
  avatar: generateAvatar(),
  roleId: initialRoles.find(role => role.name === 'admin')!.id,
})

const useInitialRoles = () => cloneDeep(initialRoles)

const useInitialUser = () =>
  Array.from({ length: 99 }).map(() => ({
    id: nanoid(),
    username: faker.internet.username(),
    createdAt: new Date(),
    name: fakerZH_CN.person.fullName(),
    email: faker.internet.email(),
    roleId: initialRoles.find(role => role.name === 'user')!.id,
    avatar: generateAvatar(),
  }))

abstract class Table<T> {
  protected _md: MockData

  constructor(mockData: MockData) {
    this._md = mockData
  }

  protected abstract _data: T[]
}

class Roles extends Table<RoleSelectModel> {
  protected _data = useInitialRoles()

  findMany() {
    return this._data
  }
}

class DefaultRole extends Table<DefaultRoleSelectModel> {
  protected _data = [
    {
      id: nanoid(),
      roleId: initialRoles.find(role => role.name === 'user')!.id,
    },
  ]

  findFirst() {
    return this._data[0]
  }
}

class Users extends Table<SafeUserSelectModel> {
  protected _data = useInitialUser()

  findMany() {
    return [omit(authUser, ['passwordHash']), ...this._data]
  }

  findManyWithRoleName() {
    const result = this.findMany()
    const roles = this._md.roles.findMany()
    return result.map(user => ({
      ...user,
      role: {
        name: roles.find(role => role.id === user.roleId)!.name,
      },
    }))
  }
}

class MockData {
  users = new Users(this)
  defaultRole = new DefaultRole(this)
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
