import type { PaginationSchema } from '#shared/schema'

import { useMockDatabase } from '~~/shared/mocks'

export default defineEventHandler(async event => {
  const { id } = await requireUserSession(event)

  const db = useMockDatabase(id)

  const { pageIndex, pageSize, searchFiled, searchValue } = getQuery<PaginationSchema>(event)

  const roles = db.roles.findMany()

  const filteredRoles =
    searchValue && searchFiled && searchFiled === 'name'
      ? roles.filter(user => user[searchFiled].includes(name))
      : roles

  const start = (Number(pageIndex) - 1) * Number(pageSize)

  const data = filteredRoles.slice(start, start + Number(pageSize))

  return {
    data,
    meta: {
      total: roles.length,
    },
  }
})
