"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signIn, signOut } from "next-auth/react";

import Google from "next-auth/providers/google";
import { db } from "../lib/db";
import { NextResponse } from "next/server";
import { SearchYT } from "@/components/SearchYt";

export default function Dashboard() {
  const [detination, setDetination] = useState("");
  const [isSoruceSelected, setIsSoruceSelected] = useState(false);
  const [isDetinationSelected, setIsDetinationSelected] = useState(false);

  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const generateAuthUrl = async () => {
    try {
      const res = await fetch("/api/youtubePlaylist");

      return await res.json();
    } catch (e) {
      return NextResponse.json({
        message: "aaa",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await generateAuthUrl();
      // const data1 = await checkIfUserHaveSignIn();
      setURL(res.message);
      // setCode(data1.code);

      setIsLoading(true);
    };

    fetchData();
  }, [isLoading]);
  const checkIfUserHaveSignIn = async () => {
    const res = await fetch("/api/youtube/redirect");

    return await res.json();
  };

  const handleClick = async (serviceName: string) => {
    if (serviceName == "YouTube") {
      openNewWindow(URL);
    } else if (serviceName == "Spotify") {
      await signIn("spotify", undefined, {
        prompt: "consent",
      });
    }
  };
  const openNewWindow = (url: string) => {
    window.open(url, "_blank", "width=800,height=600");
  };

  const services: PlatformService[] = [
    {
      name: "Spotify",
      icon: "https://upload.wikimedia.org/wikipedia/en/1/19/Spotify_logo_without_text.svg",
    },
    {
      name: "Apple Music",
      icon: "https://upload.wikimedia.org/wikipedia/en/6/62/Apple_Music_logo.svg",
    },
    {
      name: "Amazon Music",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Amazon_Music_logo.svg",
    },
    {
      name: "YouTube",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/YouTube_Music_logo.svg",
    },
    {
      name: "Tidal",
      icon: "https://upload.wikimedia.org/wikipedia/en/5/56/TIDAL_logo.svg",
    },
    {
      name: "Deezer",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/68/Deezer_logo.svg",
    },
    {
      name: "Pandora",
      icon: "https://upload.wikimedia.org/wikipedia/en/3/34/Pandora_logo.svg",
    },
  ];

  const renderServices = services.map((service) => (
    <div className="m-2" key={service.name}>
      <button
        className="border border-black p-3 m-2"
        onClick={(e) => {
          e.preventDefault();
          handleClick(service.name);
        }}
      >
        {service.name}
      </button>
    </div>
  ));

  return (
    <div>
      {!isLoading ? (
        " loading..."
      ) : (
        <div>
          <div className="flex  gap-2">{renderServices}</div>

          <div>
            <SearchYT code={code} />
          </div>
        </div>
      )}
    </div>
  );
}
