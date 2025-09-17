import { z } from 'zod'

export function useLoginSchema({
  usernameRequired,
  passwordRequired,
}: {
  usernameRequired: string
  passwordRequired: string
}) {
  return z.object({
    username: z.string(usernameRequired).min(1, usernameRequired),
    password: z.string(passwordRequired).min(1, passwordRequired),
    remember: z.boolean().optional(),
  })
}

export type LoginSchema = z.output<ReturnType<typeof useLoginSchema>>
