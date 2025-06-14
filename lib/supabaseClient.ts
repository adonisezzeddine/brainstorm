import { createClient } from '@supabase/supabase-js';
import { Session } from 'next-auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Global variable to ensure singleton across module reloads
declare global {
  interface Window {
    supabaseInstance: any;
  }
}

// Create a single instance of the Supabase client
export const supabase = (() => {
  if (typeof window !== 'undefined') {
    if (!window.supabaseInstance) {
      window.supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        },
        global: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });
    }
    return window.supabaseInstance;
  } else {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
  }
})();

// Helper function to set the current user ID for RLS
export const setCurrentUserId = async (userId: string) => {
  if (!userId) {
    console.error('Invalid userId provided to setCurrentUserId');
    return false;
  }
  
  try {
    console.log('Setting current user ID:', userId);
    const { error } = await supabase.rpc('set_current_user_id', { user_id: userId });
    
    if (error) {
      console.error('Error setting current user ID:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        hint: error.hint
      });
      return false;
    }
    
    console.log('Successfully set current user ID');
    return true;
  } catch (error) {
    console.error('Exception in setCurrentUserId:', error);
    return false;
  }
};

// Function to set Supabase session from NextAuth
export const setSupabaseSession = async (session: any) => {
  if (!session) {
    console.error('No session provided to setSupabaseSession');
    return false;
  }
  
  try {
    if (session?.supabaseAccessToken) {
      console.log('Setting Supabase session from NextAuth');
      
      await supabase.auth.setSession({
        access_token: session.supabaseAccessToken,
        refresh_token: session.supabaseRefreshToken || '',
      });
      
      // Verify the session was set correctly
      const { data } = await supabase.auth.getSession();
      
      if (data?.session) {
        console.log('Supabase session set successfully');
        return true;
      } else {
        console.error('Session appears to be set but getSession returned null');
        return false;
      }
    }
    
    console.log('No Supabase access token found in session');
    return false;
  } catch (error) {
    console.error('Error setting Supabase session:', error);
    return false;
  }
};

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseKey); 

export function getSupabaseClient(session: Session | null) {
  if (!session?.accessToken) {
    console.log('No access token in session, using default client');
    return supabase;
  }

  console.log('Creating client with session:', {
    userId: session.user?.id,
    hasAccessToken: !!session.accessToken,
    accessTokenLength: session.accessToken?.length
  });

  // Create a new client with the session
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        apikey: supabaseAnonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      }
    }
  });

  // Set the auth token
  client.auth.setSession({
    access_token: session.accessToken,
    refresh_token: ''
  }).then(({ data, error }) => {
    if (error) {
      console.error('Error setting session:', error);
    } else {
      console.log('Session set successfully:', {
        hasSession: !!data.session,
        userId: data.session?.user?.id,
        accessToken: data.session?.access_token?.substring(0, 10) + '...'
      });
    }
  });

  return client;
} 

// Add this to your settings page temporarily
// console.log('Session:', session);
// console.log('Access Token:', session?.accessToken); 