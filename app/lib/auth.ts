import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import { debug } from "../constant ";
import { Session } from "next-auth";
import { pages } from "next/dist/build/templates/app-page";

export interface session extends Session {
  googleAccessToken: string;
  spotifyAccessToken: string;
  user: {
    email: string;
    name: string;
    image: string;
  };
}
const scopes = ["playlist-read-private"].join(",");
const params = {
  scope: scopes,
};
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube",
        },
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.provider === "google") {
        token.googleAccessToken = account.access_token;
      }
      if (account?.provider === "spotify") {
        token.spotifyAccessToken = account.access_token;
      }
      return token;
    },
    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: any;
      token: any;
    }) {
      session.googleAccessToken = token.googleAccessToken;
      session.spotifyAccessToken = token.spotifyAccessToken;
      console.log(token);

      return { ...session };
    },
  },
};
