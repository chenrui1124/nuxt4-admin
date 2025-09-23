import { useMockAuthUser } from '#shared/mocks'
import type { LoginSchema } from '#shared/schema'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async event => {
  const { username, password, remember } = await readBody<LoginSchema>(event)

  const user = useMockAuthUser()

  if (username !== user.username) {
    throw createError({ statusCode: 401 })
  }

  const isMatch = bcrypt.compareSync(password, user.hashedPassword)
  if (isMatch) {
    const { hashedPassword: _, ...safeUser } = user
    await setUserSession(
      event,
      { user: safeUser },
      { maxAge: remember ? 60 * 60 * 24 * 30 : void 0 },
    )
  } else {
    throw createError({ statusCode: 401 })
  }
})
