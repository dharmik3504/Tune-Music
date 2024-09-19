"use client";
import { useSession } from "next-auth/react";
import * as yt from "youtube-search-without-api-key";

export const SearchYt = () => {
  // const videos = await yt.search("RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g");
  const { data: session, status } = useSession();
  // console.log(videos);
  const testRender = (
    <div>
      <h1>Dashboard</h1>
      <p>Google Access Token: {JSON.stringify(session) || "No token"}</p>
      <p>
        Spotify Access Token:
        {session.spotifyAccessToken || "No token"}
      </p>
    </div>
  );
  return <div>{testRender}</div>;
};
