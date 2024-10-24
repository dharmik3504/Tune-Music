// import { cookies } from "next/headers";
export const getToken = async (code: string, credentials: string) => {
  // const cookieStore = cookies();
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
  const { access_token } = await res.json();
  
  return access_token;
};
export const getSoptifyPlaylist = async (spotifyAccess_token: string) => {
  // const cookieStore = cookies();
  
  const clientId = process.env.SPOTIFY_CLIENT_ID ?? "";

  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
  const credentials = `${clientId}:${clientSecret}`;

  // const spotifyAccess_token = cookieStore.get("spotify_access_token")?.value;
  const playlist_id = "060eFjSpy8jYedpEA8ofQq"; // will come from client

  const params = new URLSearchParams();

  params.append("playlist_id", playlist_id);

  params.append(
    "fields",
    "items(added_by.id,track(name,href,album(name,href)))"
  );

  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?${params.toString()}`,
    {
      
      headers: {
        Authorization: "Bearer " + spotifyAccess_token,
      },
    }
  );

  return await res.json()

};
