import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // server-side only
const supabase = createClient(supabaseUrl, supabaseKey);

export const loginService = async (email, password) => {
  // Check if email and password exist in users table
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single(); // return single user

  if (error) {
    console.error('Supabase login error:', error);
    return null;
  }

  return data; // returns user object if found
};
