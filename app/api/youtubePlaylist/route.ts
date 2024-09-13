import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await getServerSession(authConfig);
  console.log(session);
  const YT_URL =
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=RDCLAK5uy_l_Bj8rMsjkhFMMs-eLrA17_zjr9r6g_Eg";
  const getYoutubePlaylistData = await fetch(YT_URL, {
    headers: new Headers({
      Authorization: `Bearer ${session.accessToken}`,
    }),
  });
  const res = await getYoutubePlaylistData.json();
  return NextResponse.json({
    res,
  });
}
1;
