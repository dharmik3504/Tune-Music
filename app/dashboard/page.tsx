"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signIn, signOut, useSession } from "next-auth/react";
import { SearchYt } from "../../components/SearchYt";

import Google from "next-auth/providers/google";
import { db } from "../lib/db";

export default function Dashboard() {
  const [soruce, setSoruce] = useState("");
  const [detination, setDetination] = useState("");
  const [isSoruceSelected, setIsSoruceSelected] = useState(false);
  const [isDetinationSelected, setIsDetinationSelected] = useState(false);
  const session = useSession();
  let getuser = null;
  // if (session.data && session.data.user?.email) {
  //   getuser =  db.user.findUnique({
  //     where: {
  //       email: session.data?.user?.email,
  //     },
  //   });
  // }
  const signInWithYouTube = async () => {
    await signIn("google", {
      scope: "openid email profile https://www.googleapis.com/auth/youtube",
      callbackUrl: "/dashboard", // Redirect URL after the second sign-in
    });
  };

  // const data = async () => {
  //   let res = null;
  //   try {
  //     res = await fetch("/api/spotifyPlaylist", {
  //       credentials: "include",
  //     });
  //     console.log(await res.json());
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return res;
  // };
  useEffect(() => {
    // data();
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(soruce);
    console.log(detination);
  };
  const handleClick = async (serviceName: string) => {
    if (serviceName == "Youtube") {
      await signIn("google", undefined, {
        scope: "openid email profile https://www.googleapis.com/auth/youtube",
        prompt: "consent",
        show_dialog: "true",
        redirect: "false",
      });
    } else if (serviceName == "Spotify") {
      await signIn("spotify", undefined, {
        prompt: "consent",
      });
      // setIsSoruceSelected(true);
    }
  };

  const services: PlatformService[] = [
    {
      name: "Spotify",
      selection: null,
      inputType: <input type="text"></input>,
    },
    {
      name: "Youtube",
      selection: null,
      inputType: <input type="text"></input>,
    },
  ];

  const renderServices = services.map((service) => (
    <div className="m-2" key={service.name}>
      <button
        className="border border-black p-3 m-2"
        onClick={() => handleClick(service.name)}
      >
        {service.name}
      </button>
    </div>
  ));
  const testRender = (
    <div>
      <h1>Dashboard</h1>
      <p>
        Google Access Token:{" "}
        {session.data?.user.googleAccessToken || "No token"}
      </p>
      <p>Spotify Access Token: {session.spotifyAccessToken || "No token"}</p>
    </div>
  );
  return (
    <div>
      <div className="flex  gap-2">{renderServices}</div>
      <div>
        {isSoruceSelected ? (
          <div>
            <label>Copy Spotify playlist URL and paste here:</label>
            <input
              type="text"
              value={soruce}
              placeholder="Paste Spotify playlist URL here"
              className="border border-red-600"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
