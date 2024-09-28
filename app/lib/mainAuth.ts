import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import { db } from "./db";

const scopes = ["playlist-read-private"].join(",");
const params = {
  scope: scopes,
};
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();
export interface session extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    googleAccessToken: string;
    spotifyAccessToken: string;
    youtubeToken: string;
  };
}
export interface jwt extends JWT {
  token: {
    googleAccessToken: string;
    spotifyAccessToken: string;
  };
}
export const mainAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: LOGIN_URL,
    }),
  ],
  pages: {
    signIn: "/signin",
    transfertoYT: "/youtube",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn(params) {
      if (params.account.scope) {
      }

      if (!params.user.email) {
        return false;
      }
      try {
        const existingUser = await db.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        if (existingUser) {
          return true;
        }
        await db.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
            ImageURL: "",
          },
        });
        return true;
      } catch (e) {
        return false;
      }
    },
    async jwt({ token, account, profile, user }) {
      if (user && user.email && account) {
        const dbUser = await db.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!dbUser) {
          return token;
        }
        return {
          ...token,
          id: dbUser.id,
          googleAccessToken: account.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          googleAccessToken: token.googleAccessToken,
        },
      };
    },
  },
};
