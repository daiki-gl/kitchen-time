import { createSlice } from "@reduxjs/toolkit"
import { getLoginUser } from "../middleware/api"

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
        },
        unsetUser(state) {
            state.user = null
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

export default userSlice.reducer;