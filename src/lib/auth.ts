import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { postFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import { _ENV_VARIABLES } from "@/constants/envVariables";

const GOOGLE_CLIENT_ID = _ENV_VARIABLES.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = _ENV_VARIABLES.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = _ENV_VARIABLES.JWT_SECRET;

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
        user_name: { label: "User Name", type: "text" },
        user_password: { label: "User Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const payload =
          credentials.user_name && credentials.user_password
            ? {
                email: credentials.email,
                user_name: credentials.user_name,
                user_password: credentials.user_password,
              }
            : {
                email: credentials.email,
                password: credentials.password,
              };

        const apiRoute = payload.user_name
          ? API_ROUTES.TOKEN_LOGIN
          : API_ROUTES.LOGIN;

        const user = await postFetcher(apiRoute, payload);

        if (!user.status) {
          throw new Error(user.message || "Login failed");
        }

        return user.data;
      },
    }),

    // CredentialsProvider({
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //     user_name: { label: "User Name", type: "text" }, // Add user_name field
    //     user_password: { label: "User Password", type: "password" }, // Add user_password field
    //   },
    //   async authorize(credentials, req) {
    //     let payload;

    //     if (!credentials?.user_name) {
    //       // If password is provided, login with email and password
    //       payload = {
    //         email: credentials?.email,
    //         password: credentials?.password,
    //       };
    //     } else if (credentials?.user_name && credentials?.user_password) {
    //       // If no password, login with user_name and user_password
    //       payload = {
    //         email: credentials?.email,
    //         user_name: credentials.user_name,
    //         password: credentials?.password,
    //         user_password: credentials.user_password,
    //       };
    //     } else {
    //       throw new Error("Invalid login details");
    //     }
    //     let user;

    //     if (!credentials?.user_name) {
    //       user = await postFetcher(API_ROUTES.LOGIN, payload);
    //     } else if (credentials?.user_name && credentials?.user_password) {
    //       user = await postFetcher(API_ROUTES.TOKEN_LOGIN, payload);
    //     } else {
    //       throw new Error("Invalid login details");
    //     }

    //     if (!user.status) {
    //       throw Error(user.message);
    //     }

    //     return user.data; // Return user data on successful login
    //   },
    // }),
  ],

  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }: any) {
      if (trigger === "update" && session?.is_onboarded) {
        token.userData.is_onboarded = session.is_onboarded;
      }
      if (account && user) {
        if (account.provider === "google") {
          const userNew = await postFetcher(API_ROUTES.SOCIAL_LOGIN, {
            email: user.email,
            account_id: account.providerAccountId,
          });

          const userData = userNew.status ? userNew.data : {};
          return {
            ...token,
            id_token: account.id_token,
            userData: {
              ...userData,
            },
          };
        }
        if (account.provider === "credentials") {
          return {
            ...token,
            id_token: user.id,
            userData: {
              ...user,
            },
          };
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.id_token = token.id_token;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;

      session.user = {
        ...session.user,
        ...token.userData,
      };
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const user = await postFetcher(API_ROUTES.SOCIAL_LOGIN, {
            email: profile?.email,
            account_id: account.providerAccountId,
          });
          if (user.status) {
            return true;
          } else {
            return "/login";
          }
        } catch (e) {
          return true;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: JWT_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
