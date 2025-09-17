import type { LoginSchema } from '#shared/schema'

import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

const user = {
  id: nanoid(),
  username: 'admin',
  password: bcrypt.hashSync('0123456789', 10),
  createdAt: new Date(),
  email: 'example@example.com',
  name: 'John Doe',
  avatar: `https://avatar.iran.liara.run/public/${faker.number.int({ min: 10, max: 99 })}`,
} as const satisfies UnsafeUser

function validateAuth(body: LoginSchema) {
  return bcrypt.compareSync(body.password, user.password)
}

export default defineEventHandler(async event => {
  const body = await readBody<LoginSchema>(event)

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
