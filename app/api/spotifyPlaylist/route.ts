import { mainAuthConfig } from "@/app/lib/mainAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await getServerSession(mainAuthConfig);
  const SPOTIFY_URL =
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?";
  const params = new URLSearchParams();
  params.append("limit", "100");

  const getSpotifyPlaylistData = await fetch(SPOTIFY_URL + params, {
    headers: new Headers({
      Authorization: `Bearer ${session.googleAccessToken}`,
    }),
  });
  const res = await getSpotifyPlaylistData.json();
  return NextResponse.json({
    res,
  });
}
