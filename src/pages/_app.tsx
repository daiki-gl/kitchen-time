import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux';

import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import '@/styles/globals.css'
import { store } from '@/redux/store';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'



export default function App({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
    <Provider store={store}>
      <main className={` bg-secondaryColor text-font-color`}>
        {pathname !== '/login' && pathname !== '/signup' && (
          <>
            <Header />
            <Navigation />
          </>
        )}
        <Component {...pageProps} />
      </main>
    </Provider>
    </SessionContextProvider>
    
  )
}