import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await getServerSession(authConfig);
  const SPOTIFY_URL =
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?";
  const params = new URLSearchParams();
  params.append("limit", "100");

  const getSpotifyPlaylistData = await fetch(SPOTIFY_URL + params, {
    headers: new Headers({
      Authorization: `Bearer ${session.accessToken}`,
    }),
  });
  const res = await getSpotifyPlaylistData.json();
  return NextResponse.json({
    res,
  });
}
