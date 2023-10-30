import { supabase } from '@/lib/supabaseClient'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getRecipes: any = createAsyncThunk(
  'recipe/getRecipes',
  async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*, users(id, name, avatar, bio, cover_image)')

    if (error) {
      console.log(error)
      return []
    }
    return data
  }
)

export const getLoginUser: any = createAsyncThunk(
  'user/getLoginUser',
  async (id: string) => {
    const { data, error } = await supabase.from('users').select().eq('id', id)

    if (error) {
      console.log(error)
      return []
    }
    return data
  }
)
