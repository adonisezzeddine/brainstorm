// // app/api/auth/[...nextauth]/route.ts
// // app/api/auth/[...nextauth]/route.ts

// // app/api/auth/[...nextauth]/route.ts

import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { supabase } from "@/lib/supabaseClient";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { AuthOptions } from "next-auth";

console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// Extend the built-in Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // This provider lets users sign in with email and password.
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }
        // Use Supabase's auth method to sign in with password.
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        if (error || !data.user) {
          throw new Error("Invalid email or password");
        }
        // Return the user object on success
        return data.user;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the access token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // If the URL is /notes or contains /notes, redirect to the welcome page
      if (url.includes('/notes')) {
        return baseUrl;
      }
      // If the URL is relative, prepend the base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // If the URL is absolute and on the same domain, allow it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default to the welcome page
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";

// console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   }),
//   secret: process.env.NEXTAUTH_SECRET!,
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       session.user = { ...session.user, id: token.id as string };
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// "use client";
// console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// import NextAuth, { SessionStrategy } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// // Extend the built-in Session type
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     }
//   }
// }

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use the correct property name
//     schema: "public",
//   } as any),
//   secret: process.env.NEXTAUTH_SECRET!,
//   session: {
//     strategy: "jwt" as SessionStrategy,
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user: any }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       session.user = { ...session.user, id: token.id as string };
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
// };

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);


// console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// import NextAuth, { SessionStrategy } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     }
//   }
// }

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   }),
//   secret: process.env.NEXTAUTH_SECRET!,
//   session: {
//     strategy: "jwt" as SessionStrategy,
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user: any }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       session.user = { ...session.user, id: token.id as string };
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === 'development',
// });

// export { handler as GET, handler as POST };




// console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   }),
//   secret: process.env.NEXTAUTH_SECRET!,
//   debug: true,
// };

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";

// // Debug log to verify environment variable loading
// console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use the correct value here
//     schema: "public"
//   } as any),
//   secret: process.env.NEXTAUTH_SECRET!,
//   debug: true,
// };

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@next-auth/supabase-adapter";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Ensure this variable is loaded
//     schema: "public"
//   } as any),
  
// //   adapter: SupabaseAdapter({
// //     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //     supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Ensure this variable is loaded
// //     schema: "public"
// //   } as any),
//   secret: process.env.NEXTAUTH_SECRET!,
//   debug: true,
// };

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);
