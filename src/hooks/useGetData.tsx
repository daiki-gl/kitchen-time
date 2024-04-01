import { getLoginUser, getRecipes } from '@/redux/middleware/api'
import { selectRecipe, selectUser, selectUserLoading } from '@/redux/slice/UserSlice'
import { RootState } from '@/redux/store'
import { Loading, RecipeData, User } from '@/types/type'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetData = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState,string, any>>()

  const user = useSelector(selectUser)
  const loadingUser = useSelector(selectUserLoading)
  const {recipes, loading: loadingRecipes} = useSelector(selectRecipe)

  useEffect(() => {
    dispatch(getRecipes()) // redux/store.tsx/middleware: [thunk] has the problem
      user && dispatch(getLoginUser(user.id))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // useEffect(() => {
  //   user && dispatch(getLoginUser(user.id))
  //   },[user && user.avatar, user.bio, user.cover_image, user.name])

  return {user, recipes, loadingRecipes, loadingUser}
}
export default useGetData