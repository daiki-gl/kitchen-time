import { config } from '@/config'
import { createClient } from '@supabase/supabase-js'
// import { Database } from '../types/supabase'

// need to check
const supabaseUrl = config.supabase_url ?? ''
const supabaseKey = config.supabase_key ?? ''
// const supabase = createClient<Database>(supabaseUrl, supabaseKey)
export const supabase = createClient(supabaseUrl, supabaseKey)

export const getSession = async () => {
    const session = await supabase.auth.getSession()
    console.log({session});
    return session
}