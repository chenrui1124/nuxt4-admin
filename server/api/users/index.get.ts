import type { PaginationSchema } from '~~/shared/schema'

import { mocks } from '~~/shared/mocks'
import { cloneDeep } from 'es-toolkit'

function getUsersWithRoleName() {
  const users = cloneDeep(mocks.users)

  const roleMap = new Map(mocks.roles.map(role => [role.id, role.name]))

  return users.map<SafeUser & { role: { name: string } }>(user => ({
    ...user,
    role: { name: roleMap.get(user.roleId)! },
  }))
}

export default defineEventHandler(async event => {
  await requireUserSession(event)

  const userWithRoleName = getUsersWithRoleName()

  const { pageIndex, pageSize, searchFiled, searchValue } = getQuery<PaginationSchema>(event)

  const filteredUsers =
    searchValue && searchFiled && searchFiled === 'name'
      ? userWithRoleName.filter(user => user[searchFiled].includes(searchValue))
      : userWithRoleName

  const start = (Number(pageIndex) - 1) * Number(pageSize)

  const responseUsers = filteredUsers.slice(start, start + Number(pageSize))

  return {
    data: responseUsers,
    meta: {
      total: userWithRoleName.length,
    },
  }
})
