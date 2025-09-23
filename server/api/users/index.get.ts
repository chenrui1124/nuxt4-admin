import { useMockDatabase } from '#shared/mocks'
import type { PaginationWithSearchSchema } from '#shared/schema'

export default defineEventHandler(async (event): Promise<GetUsersResponse> => {
  const { id } = await requireUserSession(event)

  const db = useMockDatabase(id)

  const users = db.users.findManyWithRoleName()

  const { pageIndex, pageSize, searchFiled, searchValue } = getQuery<PaginationWithSearchSchema>(event)

  const filteredUsers =
    searchValue && searchFiled && searchFiled === 'name'
      ? users.filter(user => user[searchFiled].includes(searchValue))
      : users

  const start = (Number(pageIndex) - 1) * Number(pageSize)

  const data = filteredUsers.slice(start, start + Number(pageSize))

  return {
    data,
    meta: {
      total: users.length,
    },
  }
})
