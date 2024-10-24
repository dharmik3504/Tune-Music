import { getToken } from "@/app/lib/spotify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  
  const cookieStore = cookies();
  const code = req.nextUrl.searchParams.get("code") ?? "";
  const state = cookieStore.get("state")?.value;
  cookieStore.set("SpotifyCode", code ?? "");
  const paramsState = req.nextUrl.searchParams.get("state") || null;
  const clientId = process.env.SPOTIFY_CLIENT_ID ?? "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
  const credentials = `${clientId}:${clientSecret}`;

  if (state !== paramsState) {
    return NextResponse.json({
      message: "something went wrong",
    });
  }

  if (req.method === "GET") {
    if (code) {
      let access_token=await getToken(code, credentials);
      cookieStore.set("spotify_access_token", access_token ?? "");
      return NextResponse.json({
        message: "Authorization successed",
      });
    } else {
      return NextResponse.json({
        message: "something is missing in formData",
      });
    }
  } else if (req.method === "POST") {
    // let access_token=await getToken(code, credentials);
    let token=cookieStore.get("code")?.value;
    return NextResponse.json({
      token
    })
    console.log("inside post");
  }
}

