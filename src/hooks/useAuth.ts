import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {  
    const cleanEmail = email.trim().toLowerCase()
    console.log('Signup:', cleanEmail)
    
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password 
    })
    console.log('Signup Result:', data, error)
    if (error) throw new Error(error.message)
  }
  
  const signIn = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase()
    console.log('Login:', cleanEmail)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    })
    console.log('Login Result:', data, error)
    if (error) throw new Error(error.message)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, loading, signUp, signIn, signOut }
}
