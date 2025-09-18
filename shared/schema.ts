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

export const paginationSchema = z.object({
  pageIndex: z.number().min(0),
  pageSize: z.number().min(10),
  searchFiled: z.string().optional(),
  searchValue: z.string().optional(),
})
export type PaginationSchema = z.output<typeof paginationSchema>
