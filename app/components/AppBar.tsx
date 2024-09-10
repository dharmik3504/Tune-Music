"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const AppBar = () => {
  const session = useSession();

  console.log(session);
  // const res= await fetch("https://www.googleapis.com/youtube/v3/playlistItems?"+new URLSearchParams({
  //   "a":""
  // }).toString())

  return (
    <div className="flex justify-between p-2 m-2 ">
      <div> Tune Music</div>
      <div>
        {session.data?.user ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </div>
  );
};
