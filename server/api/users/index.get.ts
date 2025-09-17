import { mocks } from '~~/shared/mocks'
import { UsersSchema } from '~~/shared/schema'

function getUsersWithRoleName() {
  const roleMap = new Map(mocks.roles.map(role => [role.id, role.name]))
  return mocks.users.map<SafeUser & { role: { name: string } }>(user => ({
    ...user,
    role: {
      name: roleMap.get(user.roleId)!,
    },
  }))
}

const userWithRoleName = getUsersWithRoleName()

export default defineEventHandler(async event => {
  await requireUserSession(event)

  const { page, limit, name } = getQuery<UsersSchema>(event)

  const users = name ? userWithRoleName.filter(user => user.name.includes(name)) : userWithRoleName

  const start = (Number(page) - 1) * Number(limit)

  const responseUsers = users.slice(start, start + Number(limit))

  return {
    data: responseUsers,
    meta: {
      total: userWithRoleName.length,
    },
  }
})
