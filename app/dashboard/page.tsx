import { getServerSession } from "next-auth";
import { authConfig } from "../lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authConfig);

  const params = new URLSearchParams();
  params.append("limit", "100");
  const res = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?" +
      params,
    {
      headers: new Headers({
        Authorization: `Bearer ${session.accessToken}`,
      }),
    }
  );
  const { items } = await res.json();
  return items.map((item, index) => (
    <div key={item.track.id}>{`${index + 1} - ${item.track.name}`}</div>
  ));
}
