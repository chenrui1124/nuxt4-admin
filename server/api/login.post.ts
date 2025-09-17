import type { LoginSchema } from '#shared/schema'

import bcrypt from 'bcryptjs'
import { mocks } from '#shared/mocks'

function validateAuth(body: LoginSchema) {
  return bcrypt.compareSync(body.password, mocks.authUser.password)
}

export default defineEventHandler(async event => {
  const body = await readBody<LoginSchema>(event)

  const user = mocks.authUser

  if (validateAuth(body)) {
    const { password: _, ...safeUser } = user
    await setUserSession(
      event,
      { user: safeUser },
      { maxAge: body.remember ? 60 * 60 * 24 * 30 : void 0 },
    )
  } else {
    throw createError({ statusCode: 401 })
  }
})
