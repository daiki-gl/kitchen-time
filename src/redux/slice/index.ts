import { combineReducers } from 'redux'
import RecipeSlice from './RecipeSlice'
import UserSlice from './UserSlice'

export const rootReducer = combineReducers({
    recipe: RecipeSlice,
    users: UserSlice
})