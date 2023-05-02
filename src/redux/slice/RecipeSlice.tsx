import { createSlice } from "@reduxjs/toolkit"
import { getRecipes } from "../middleware/api"

type StateType = {
    recipes: string[] | null,
    loading: string,
    error: string | null | undefined
}

const initialState:StateType = {
    recipes: [],
    loading: 'idle',
    error: null,
}

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        createRecipe(state, action) {
            state.recipes = state.recipes + action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRecipes.pending, (state) => {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        })
        .addCase(getRecipes.fulfilled, (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.recipes = action.payload
            }
        })
        .addCase(getRecipes.rejected, (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.error = action.error.message
            }
        })
    }
})

export const { createRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;