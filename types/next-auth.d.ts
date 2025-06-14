import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      /** The user's id. */
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    /** Supabase access token */
    supabaseAccessToken?: string;
    /** Supabase refresh token */
    supabaseRefreshToken?: string;
    /** Session expiry timestamp */
    expires: string;
  }
} 