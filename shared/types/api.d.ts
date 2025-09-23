type ResponseWithMeta<D extends object & Array, M = {}> = {
  data: D
  meta: M
}

export type GetUsersResponse = ResponseWithMeta<
  Array<SafeUserSelectModel & { role: Pick<RoleSelectModel, 'name'> }>,
  { total: number }
>

export type GetRolesResponse = ResponseWithMeta<RoleSelectModel[], { defaultRoleId: string }>
