import { createSlice } from "@reduxjs/toolkit"
import { getLoginUser } from "../middleware/api"
import { RootState } from "../store"

// change any type
type StateType = {
    user: any | null,
    loading: string,
    error: string | null | undefined
}

const initialState:StateType = {
    user: null,
    loading: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
            console.log(state.user);
        },
        unsetUser(state) {
            state.user = null
            console.log('unset user', state.user);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLoginUser.pending, (state) => {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        })
        .addCase(getLoginUser.fulfilled, (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.user = action.payload
            }
        })
        .addCase(getLoginUser.rejected, (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.error = action.error.message
            }
        })
    }
})

export const { setUser, unsetUser } = userSlice.actions;

export const selectUser = ((state: RootState) => (state.persistedReducer.users.user !== null) && state.persistedReducer.users?.user[0])
export const selectUserLoading = ((state: RootState) => state.persistedReducer.users.loading)
export const selectRecipe = ((state:RootState) => state.persistedReducer.recipe)

export default userSlice.reducer;