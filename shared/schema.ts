import { z } from 'zod'
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from './consts'

/*
 * Login
 */
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

/*
 * Signup
 */
export const useSignupSchema = ({
  emailInvalid,
  usernameTooShort,
  usernameTooLong,
  passwordTooShort,
  passwordTooLong,
}: {
  emailInvalid?: string
  usernameTooShort?: string
  usernameTooLong?: string
  passwordTooShort?: string
  passwordTooLong?: string
}) =>
  z.object({
    username: z
      .string()
      .min(USERNAME_MIN_LENGTH, usernameTooShort)
      .max(USERNAME_MAX_LENGTH, usernameTooLong),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, passwordTooShort)
      .max(PASSWORD_MAX_LENGTH, passwordTooLong),
    email: z.email(emailInvalid),
  })
export type SignupSchema = z.output<ReturnType<typeof useSignupSchema>>

/*
 * Pagination
 */
export const usePaginationSchema = () =>
  z.object({
    pageIndex: z.number().min(0),
    pageSize: z.number().min(10),
    searchFiled: z.string().optional(),
    searchValue: z.string().optional(),
  })
export type PaginationSchema = z.output<ReturnType<typeof usePaginationSchema>>
