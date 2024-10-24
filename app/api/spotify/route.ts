import { NextResponse } from "next/server";
import { google } from "googleapis";
import crypto from "crypto";
import { cookies } from "next/headers";
export async function GET() {
  const cookieStore = cookies();
  // const codeVerifier = generateRandomString(64);

  // const hashed = await sha256(codeVerifier);

  // const codeChallenge = base64encode(hashed);

  const StreamingPlatformObj = [];
  const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
  const redirect_uri = "http://localhost:3000/api/spotify/redirect";
  const scope = "user-read-private user-read-email";
  const state = generateRandomString(64);
  cookieStore.set("state", state ?? "");
  const params = {
    response_type: "code",
    client_id,
    scope,
    redirect_uri,
    state,
  };
  const Spotify_URL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams(params).toString();

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/youtube/redirect"
  );
  const youtubeScopes = ["https://www.googleapis.com/auth/youtube"];
  const Youtube_URL = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: youtubeScopes,
  });

  StreamingPlatformObj.push({
    name: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/en/1/19/Spotify_logo_without_text.svg",
    redirect_uri: Spotify_URL, 
  });
  StreamingPlatformObj.push({
    name: "YouTube",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/YouTube_Music_logo.svg",
    redirect_uri: Youtube_URL,
  });
  return NextResponse.json({
    StreamingPlatformObj,
  });
}

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("base64");
};
// const base64encode = (input) => {
//   // 98358dc0f82869f165faf38ded246d1869faf0ead6a88e0604f4f2077fdcc85d
//   let a = new Uint8Array();
//   for (let i = 0; i < input.lengtt; i++) {
//     a.set(input[i]);
//   }

//   return btoa(String.fromCharCode(a))
//     .replace(/=/g, "")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_");
// };
