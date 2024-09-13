"use client";

import { useEffect } from "react";

export default function Dashboard() {
  const data = async () => {
    let res = null;
    try {
      res = await fetch("/api/youtubePlaylist", {
        credentials: "include",
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e);
    }
    return res;
  };
  useEffect(() => {
    data();
  });

  const services: PlatformService[] = [
    {
      name: "Spotify",
      selection: null,
    },
    {
      name: "Youtube",
      selection: null,
    },
  ];

  const params = new URLSearchParams();
  params.append("limit", "100");
  // const getSpotifyPlaylistData = await fetch(
  //   "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?" +
  //     params,
  //   {
  //     headers: new Headers({
  //       Authorization: `Bearer ${session.accessToken}`,
  //     }),
  //   }
  // );

  // const { items } = await getSpotifyPlaylistData.json();
  // const YT_URL = [
  //   "https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&id=RDCLAK5uy_l_Bj8rMsjkhFMMs-eLrA17_zjr9r6g_Eg",
  //   "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=RDCLAK5uy_l_Bj8rMsjkhFMMs-eLrA17_zjr9r6g_Eg",
  // ];
  // let getYoutubePlaylistData = null;

  // try {
  //   getYoutubePlaylistData = await fetch(YT_URL[1], {
  //     headers: new Headers({
  //       Authorization: `Bearer ${session.accessToken}`,
  //     }),
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  // const data = await getYoutubePlaylistData.json();

  // console.log(data);
  // console.log(session.accessToken);
  // const renderSpotifyData=items.map((item, index) => (
  //     <div key={item.track.id}>{`${index + 1} - ${item.track.name}`}</div>
  //   ));
  // const renderYTData=items.map((item, index) => ());
  const renderServices = services.map((service) => (
    <div className="m-2" key={service.name}>
      {service.name}
    </div>
  ));
  return <div className="flex">{renderServices}</div>;
}
