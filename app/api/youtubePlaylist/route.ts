import { NextResponse } from "next/server";
import { google } from "googleapis";

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
