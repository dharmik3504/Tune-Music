import { authConfig } from "@/app/lib/auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = ["playlist-read-private"].join(",");
const params = {
  scope: scopes,
};
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
