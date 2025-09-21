import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull().unique(),
  hashedPassword: text().notNull(),
  email: text().notNull().unique(),
  name: text().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  avatar: text(),
  roleId: uuid()
    .notNull()
    .references(() => roles.id),
})

export const roles = pgTable('roles', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  enabled: boolean().notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
