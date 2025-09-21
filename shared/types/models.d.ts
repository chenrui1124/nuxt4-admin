import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import * as schema from '~~/server/database/schema'

export type UserSelectModel = InferSelectModel<typeof schema.users>

export type UserInsertModel = InferInsertModel<typeof schema.users>

export type SafeUserSelectModel = Omit<UserSelectModel, 'hashedPassword'>

export type SafeUserInsertModel = Omit<UserInsertModel, 'hashedPassword'>

export type RoleSelectModel = InferSelectModel<typeof schema.roles>

export type RoleInsertModel = InferInsertModel<typeof schema.roles>
