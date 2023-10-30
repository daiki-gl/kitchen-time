import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import '@/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const persistor = persistStore(store)

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className={` bg-secondaryColor text-font-color`}>
          {pathname !== '/login' && pathname !== '/signup' && (
            <>
              <Header />
              <Navigation />
            </>
          )}
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
    </SessionContextProvider>
    
  )
}