"use client";

import React, { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import { SearchYT } from "@/components/SearchYt";
import { getServiceObj, GetSpotifyUrl } from "../api/spotify/route";
import { getSoptifyPlaylist } from "../lib/spotify";
import { useCookies } from 'next-client-cookies';

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(false);

  const [services, setServices] = useState([]);
  const [spotifyCode, setSpotifyCode] = useState("");
  const [spotifyAccessToken,setSpotifyAccessToken]=useState("")
  const [spotifyData, setSpotifyData] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      // const res = await generateAuthUrl();
      const res1 = await fetch("/api/spotify");
      // setURL(res.message);
      const { StreamingPlatformObj } = await res1.json();
      const cookie = await cookieStore.get("SpotifyCode");
      const code = cookie?.value ?? "";
      const spotify_access_token=await cookieStore.get("spotify_access_token")
      setSpotifyAccessToken(spotify_access_token?.value ??"")
      setSpotifyCode(code);

      setServices(StreamingPlatformObj);
      setIsLoading(true);
    };

    fetchData();
  }, [isLoading,spotifyAccessToken]);
  const checkIfUserHaveSignIn = async () => {
    const res = await fetch("/api/youtube/redirect");

    return await res.json();
  };

  const handleClick = async (service:{name:string,redirect_uri:string}) => {
    if (service.name == "YouTube") {
      openNewWindow(service.redirect_uri);
    } else if (service.name == "Spotify") {
      openNewWindow(service.redirect_uri);
      const data=await getSoptifyPlaylist(spotifyAccessToken)
      setSpotifyData(data)
    }
  };
  const openNewWindow = (url: string) => {
    window.open(url, "_blank", "width=800,height=600");
  };

  //the platform service button
  const renderServices = services.map(
    (service: { name: string; icon: string; redirect_uri: string }) => (
      <div className="m-2" key={service.name}>
        <button
          className="border border-white p-3 m-2"
          onClick={(e) => {
            e.preventDefault();
            handleClick(service);
          }}
        >
          {service.name}
        </button>
      </div>
    )
  );
  const getSpotifyData= async ()=>{await getSoptifyPlaylist(spotifyAccessToken)}

  return (
    <div>
      {!isLoading ? (
        " loading..."
      ) : (
        <div>
          <div className="flex  gap-2">{renderServices}</div>

          <div>
            {/* <SearchYT /> */}
            {spotifyAccessToken}
          
          </div>
        </div>
      )}
    </div>
  );
}
