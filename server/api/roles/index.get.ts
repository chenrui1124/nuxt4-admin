import { useMockDatabase } from '#shared/mocks'
import type { SearchSchema } from '#shared/schema'

export default defineEventHandler(async (event): Promise<GetRolesResponse> => {
  const { id } = await requireUserSession(event)

  const db = useMockDatabase(id)

  const { searchFiled, searchValue } = getQuery<SearchSchema>(event)

  const roles = db.roles.findMany()

  const defaultRole = db.defaultRole.findFirst()

  const filteredRoles =
    searchValue && searchFiled && searchFiled === 'name'
      ? roles.filter(user => user[searchFiled].includes(name))
      : roles

  return {
    data: filteredRoles,
    meta: {
      defaultRoleId: defaultRole.roleId,
    },
  }
})
