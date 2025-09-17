import { mocks } from '~~/shared/mocks'

function getUsersWithRoleName() {
  const roleMap = new Map(mocks.roles.map(role => [role.id, role.name]))
  return mocks.users.map<SafeUser & { role: { name: string } }>(user => ({
    ...user,
    role: {
      name: roleMap.get(user.roleId)!,
    },
  }))
}

export default defineEventHandler(async event => {
  await requireUserSession(event)
  return getUsersWithRoleName()
})
