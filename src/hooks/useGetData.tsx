import { getLoginUser, getRecipes } from '@/redux/middleware/api'
import { selectRecipe, selectUser, selectUserLoading } from '@/redux/slice/UserSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Loading, RecipeData, User } from '@/types/type'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetData = () => {
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(selectUser)
  const loadingUser = useSelector(selectUserLoading)
  const {recipes, loading: loadingRecipes} = useSelector(selectRecipe)

  useEffect(() => {
    dispatch(getRecipes()) // redux/store.tsx/middleware: [thunk] has the problem
      user && dispatch(getLoginUser(user.id))
  // },[])
  })

  // useEffect(() => {
  //   user && dispatch(getLoginUser(user.id))
  //   },[user && user.avatar, user.bio, user.cover_image, user.name])

  return {user, recipes, loadingRecipes, loadingUser}
}
export default useGetData