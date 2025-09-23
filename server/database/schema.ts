import { relations } from 'drizzle-orm'
import { boolean, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const id = () => uuid().primaryKey().defaultRandom()

const createdAt = () => timestamp('created_at').notNull().defaultNow()

export const roles = pgTable('roles', {
  id: id(),
  name: text().notNull().unique(),
  enabled: boolean().notNull().default(true),
  createdAt: createdAt(),
})

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}))

export const defaultRole = pgTable(
  'default_role',
  {
    roleId: uuid()
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  table => [
    primaryKey({
      columns: [table.roleId],
    }),
  ],
)

export const defaultRoleRelations = relations(defaultRole, ({ one }) => ({
  role: one(roles, {
    fields: [defaultRole.roleId],
    references: [roles.id],
  }),
}))

export const users = pgTable('users', {
  id: id(),
  username: text().notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  email: text().notNull().unique(),
  name: text().notNull(),
  createdAt: createdAt(),
  avatar: text(),
  roleId: uuid()
    .notNull()
    .references(() => roles.id),
})

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}))
