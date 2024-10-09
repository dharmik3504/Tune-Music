import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const code = req.nextUrl.searchParams.get("code") ?? "";
  const state = cookieStore.get("state")?.value;
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
      console.log(code);
      getToken(clientId, clientSecret, code, credentials);
      return NextResponse.json({
        message: "Authorization successed",
      });
    } else {
      return NextResponse.json({
        message: "something is missing in formData",
      });
    }
  } else if (req.method === "POST") {
    console.log("inside post");
  }
}

const getToken = async (
  clientId: string,
  clientSecret: string,
  code: string,
  credentials: string
) => {
  const base64Credentials = Buffer.from(credentials).toString("base64");
  const formData = new URLSearchParams();
  formData.append("code", code);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", "http://localhost:3000/api/spotify/redirect");
  const res = await fetch("https://accounts.spotify.com/api/token/", {
    body: formData,
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64Credentials,
    },
  });
  console.log(await res.json());
};
