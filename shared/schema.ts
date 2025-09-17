import { z } from 'zod'

export const useLoginSchema = ({
  usernameRequired,
  passwordRequired,
}: {
  usernameRequired: string
  passwordRequired: string
}) =>
  z.object({
    username: z.string(usernameRequired).min(1, usernameRequired),
    password: z.string(passwordRequired).min(1, passwordRequired),
    remember: z.boolean().optional(),
  })

export type LoginSchema = z.output<ReturnType<typeof useLoginSchema>>

export const useUsersSchema = () =>
  z.object({
    page: z.number().min(1),
    limit: z.number().min(1),
    name: z.string(),
  })

export type UsersSchema = z.output<ReturnType<typeof useUsersSchema>>
