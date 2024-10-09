import { google } from "googleapis";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/youtube/redirect"
);
export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();

  if (req.method === "GET") {
    const code = req.nextUrl.searchParams.get("code");
    const URLCode = cookieStore.get("code")?.value;

    if (code) {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      cookieStore.set("access_token", tokens.access_token ?? "");

      oauth2Client.on("tokens", (tokens) => {
        if (tokens.refresh_token) {
          oauth2Client.setCredentials({
            refresh_token: tokens.refresh_token,
          });
        }
      });
      if (tokens.access_token) {
        return NextResponse.json({
          token: tokens.access_token,
        });
      }
    } else {
      return NextResponse.json({
        message: "please check the URL",
        url: req.nextUrl,
        code: URLCode,
      });
    }
  } else {
    return NextResponse.json({
      message: "in else",
    });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const cookieStore = cookies();
    // const code = req.nextUrl.searchParams.get("code");
    const URLCode = cookieStore.get("access_token")?.value;

    return NextResponse.json({ accessToken: URLCode });
  }
}

export const getYTplaylistDataById = () => {
  const cookieStore = cookies();
  const URLCode = cookieStore.get("access_token")?.value;
  // const token = await fetch("/api/youtube/redirect", {
  //   method: "post",
  // });
  console.log(URLCode);
};
