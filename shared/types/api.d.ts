type ResponseWithPagination<T> = {
  data: T
  meta: {
    total: number
  }
}

export type GetUsersResponse = ResponseWithPagination<
  (SafeUserSelectModel & { role: Pick<RoleSelectModel, 'name'> })[]
>

export type GetRolesResponse = ResponseWithPagination<RoleSelectModel[]>
