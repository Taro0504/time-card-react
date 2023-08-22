import { User } from '@supabase/supabase-js';
import supabase from '../utils/supabaseClient';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      }
      const user = data.user;
      setUser(user);
    }
    getSession();
  }, []);

  return (
    <>
      <h1>
        {user ? `${user.email} : ${user.user_metadata['name']}` : 'Loading...'}
      </h1>
    </>
  );
}
