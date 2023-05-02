import {configureStore} from "@reduxjs/toolkit";
import RecipeSlice from "./slice/RecipeSlice";
import UserSlice from "./slice/UserSlice";

export const store = configureStore({
    reducer: {
        recipe: RecipeSlice,
        users: UserSlice,
    }
})