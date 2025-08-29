import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// console.log("SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
// console.log("SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export type BirthdayWish = {
  id?: string;
  created_at?: string;
  name: string;
  message: string;
};

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

export const sendWish = async (wish: Omit<BirthdayWish, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('birthday_wishes')
    .insert([wish])
    .select();

  if (error) throw error;
  return data?.[0];
};

export const getWishes = async () => {
  const { data, error } = await supabase
    .from('birthday_wishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as BirthdayWish[];
};
