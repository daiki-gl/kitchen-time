import * as z from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Please enter a valid username' })
      .max(20),
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a valid password' })
      .max(50),
    //   ...(window.location.pathname === "/signup" && {
    confirmPassword: z
      .string()
      .min(1, { message: 'Please enter a valid password' })
      .max(50),
    // })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(1, { message: 'Please enter a valid password' })
    .max(50),
})
