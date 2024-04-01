import { directionType, ingredientsType } from '@/components/RecipeForm'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export type RecipeData = {
  id: number
  title: string
  thumbnail?: string
  serves: number
  ingredients: ingredientsType
  directions: directionType
  tips?: string
  user_id: string
  recipeId: string

  users: User
}

export type User = {
  id: string
  name: string
  avatar?: string
  cover_image?: string
  bio?: string
  created_at: string
}

export type Loading = {
  loading: 'pending' | 'idle'
}

export type CredentialFormData = {
  username?: string
  email: string
  password: string
  confirmPassword?: string
}

export type CredentialInputProps = {
  title: string
  register: UseFormRegister<CredentialFormData>
  errors: FieldErrors<CredentialFormData>
  type?: string
  label: 'username' | 'email' | 'password' | 'confirmPassword'
  registerOptions?: any
}

export type loginSchemaType = z.ZodObject<
  {
    email: z.ZodString
    password: z.ZodString
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string
    password: string
  },
  {
    email: string
    password: string
  }
>

export type signUpSchemaType = z.ZodEffects<
  z.ZodObject<{
    username: z.ZodString
    email: z.ZodString
    password: z.ZodString
    confirmPassword: z.ZodString
  }>
>
