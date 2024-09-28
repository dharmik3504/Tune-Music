import { mainAuthConfig } from "@/app/lib/mainAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { google } from "googleapis";

// const path = require('path');

export async function aaa() {
  const session = await getServerSession(mainAuthConfig);
  const YT_URL =
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=RDCLAK5uy_l_Bj8rMsjkhFMMs-eLrA17_zjr9r6g_Eg";
  try {
    const getYoutubePlaylistData = await fetch(YT_URL, {
      headers: new Headers({
        Authorization: `Bearer ${session.googleAccessToken}`,
      }),
    });
    const res = await getYoutubePlaylistData.json();

    return NextResponse.json({
      res,
    });
  } catch (e) {
    return NextResponse.json({
      e,
    });
  }
}
export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/youtube/redirect"
  );
  const scopes = ["https://www.googleapis.com/auth/youtube"];

  try {
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope, you can pass it as a string
      scope: scopes,
    });

    return NextResponse.json({
      message: url,
    });
  } catch (e) {
    return NextResponse.json({
      message: e,
    });
  }
}
