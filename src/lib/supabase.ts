import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pyaswecsvjgfzzfouvng.supabase.co'
const supabaseKey = 'sb_publishable_EKxzDvI9ZIcqGdODJNLPsw_GnqdJl0c'

export const supabase = createClient(supabaseUrl, supabaseKey)
