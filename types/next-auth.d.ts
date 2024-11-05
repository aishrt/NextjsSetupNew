import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number,
      name: string,
      email: string,
      image: string,
      is_active: boolean,
      is_deleted: boolean,
      is_verify: boolean,
      is_onboarded: boolean,
      token: string
    } & Session["user"]
  }
}

declare module 'jspdf';
