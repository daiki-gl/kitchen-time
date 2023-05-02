import { supabase } from "@/lib/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecipes = createAsyncThunk('recipe/getRecipes',
    async () => {
        // console.log('got recipes');
            const {data, error} = await supabase
            .from('recipes')
            .select('*, users(id, name, avatar)')
            
            if(error){
                console.log(error);
                return []
            }
            return data
})

export const getLoginUser = createAsyncThunk('user/getLoginUser',
    async (id) => {
        console.log('Get Login User',id);
            const {data, error} = await supabase
            .from('users')
            .select()
            .eq('id', id)
            
            if(error){
                console.log(error);
                return []
            }
            return data
})

