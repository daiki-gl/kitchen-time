import { supabase } from '@/lib/supabaseClient'
import { RecipeData, User } from '@/types/type'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getRecipes = createAsyncThunk('recipe/getRecipes', async () => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*, users(id, name, avatar, bio, cover_image)')

  if (error) {
    console.log(error)
    return []
  }
  const recipeData = data as RecipeData[]
  return recipeData
})

export const getLoginUser = createAsyncThunk(
  'user/getLoginUser',
  async (id: string) => {
    const { data, error } = await supabase.from('users').select().eq('id', id)

    if (error) {
      console.log(error)
      return []
    }
    const loginUserData = data as User[]

    return loginUserData
  }
)
