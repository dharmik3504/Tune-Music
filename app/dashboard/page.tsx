"use client";

import React, { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import { SearchYT } from "@/components/SearchYt";
import { getServiceObj, GetSpotifyUrl } from "../api/spotify/route";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await generateAuthUrl();
      const res1 = await fetch("/api/spotify");
      // setURL(res.message);
      const { StreamingPlatformObj } = await res1.json();

      setServices(StreamingPlatformObj);
      setIsLoading(true);
    };

    fetchData();
  }, [isLoading]);
  const checkIfUserHaveSignIn = async () => {
    const res = await fetch("/api/youtube/redirect");

    return await res.json();
  };

  const handleClick = async (service) => {
    if (service.name == "YouTube") {
      openNewWindow(service.redirect_uri);
    } else if (service.name == "Spotify") {
      console.log("-----------------------");
      openNewWindow(service.redirect_uri);
    }
  };
  const openNewWindow = (url: string) => {
    console.log(url);
    window.open(url, "_blank", "width=800,height=600");
  };

  // const services: PlatformService[] = [
  //   {
  //     name: "Spotify",
  //     icon: "https://upload.wikimedia.org/wikipedia/en/1/19/Spotify_logo_without_text.svg",
  //   },
  //   {
  //     name: "Apple Music",
  //     icon: "https://upload.wikimedia.org/wikipedia/en/6/62/Apple_Music_logo.svg",
  //   },
  //   {
  //     name: "Amazon Music",
  //     icon: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Amazon_Music_logo.svg",
  //   },
  //   {
  //     name: "YouTube",
  //     icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/YouTube_Music_logo.svg",
  //   },
  //   {
  //     name: "Tidal",
  //     icon: "https://upload.wikimedia.org/wikipedia/en/5/56/TIDAL_logo.svg",
  //   },
  //   {
  //     name: "Deezer",
  //     icon: "https://upload.wikimedia.org/wikipedia/commons/6/68/Deezer_logo.svg",
  //   },
  //   {
  //     name: "Pandora",
  //     icon: "https://upload.wikimedia.org/wikipedia/en/3/34/Pandora_logo.svg",
  //   },
  // ];

  const renderServices = services.map(
    (service: { name: string; icon: string; redirect_uri: string }) => (
      <div className="m-2" key={service.name}>
        <button
          className="border border-black p-3 m-2"
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

  return (
    <div>
      {!isLoading ? (
        " loading..."
      ) : (
        <div>
          <div className="flex  gap-2">{renderServices}</div>

          <div>
            <SearchYT />
          </div>
        </div>
      )}
    </div>
  );
}
