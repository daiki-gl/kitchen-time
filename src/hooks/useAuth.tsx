import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slice/UserSlice';
import { getLoginUser } from '@/redux/middleware/api';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import useGetData from './useGetData';

const useAuth = () => {
    const { push } = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useGetData()

    const handleSignUp = async(formData:any) => {
      const {data: {session}, error} =  await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
      })
    
      if(error) console.log(error);
        
      if(session) {
        //   console.log(session);
        const {data, error} = await supabase
          .from('users')
          .insert({
            id: session.user.id,
            name: formData.username,
          })
          .select()
            
        if(error) console.log(error);
    
        data && push('/login')
      }
    }

      const handleLogin = async(formData:any, setLoginError: any) => {
        // console.log(formData);
        setLoginError(null)
        const {data: {session}, error} =  await supabase.auth.signInWithPassword({
            email: formData.email, 
            password: formData.password
        })
      
        if(error) return setLoginError('Email or password is wrong')
      
        if(session) {
            dispatch(setUser(session))
            dispatch(getLoginUser(session.user.id))
              user && push('/')
          }
        }

    return { handleSignUp, handleLogin }
}

export default useAuth