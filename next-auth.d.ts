import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // This is the ID coming from Supabase
    } & DefaultSession["user"];
  }
}
