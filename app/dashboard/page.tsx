import { getServerSession } from "next-auth";
import { authConfig } from "../lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authConfig);

  const params = new URLSearchParams();
  params.append("limit", "100");
  const getSpotifyPlaylistData = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?" +
      params,
    {
      headers: new Headers({
        Authorization: `Bearer ${session.accessToken}`,
      }),
    }
  );
  // const { items } = await getSpotifyPlaylistData.json();
  const YT_URL = [
    "https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&id=RDCLAK5uy_l_Bj8rMsjkhFMMs-eLrA17_zjr9r6g_Eg",
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=RDCLAK5uy_l_Bj8rMsjkhFMMs-eLrA17_zjr9r6g_Eg",
  ];
  let getYoutubePlaylistData = null;

  try {
    getYoutubePlaylistData = await fetch(YT_URL[1], {
      headers: new Headers({
        Authorization: `Bearer ${session.accessToken}`,
      }),
    });
  } catch (e) {
    console.log(e);
  }
  const data = await getYoutubePlaylistData.json();

  console.log(data);
  console.log(session.accessToken);
  // const renderSpotifyData=items.map((item, index) => (
  //     <div key={item.track.id}>{`${index + 1} - ${item.track.name}`}</div>
  //   ));
  // const renderYTData=items.map((item, index) => ());
  return (
    <div>
      Dashboard screen
      {JSON.stringify(data.items)} {session.accessToken}
    </div>
  );
}
