"use client";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
export const Hero = () => {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-4xl py-32 ">
        Transfer Playlists Between Music Services
      </div>
      <div>
        {session.data?.user ? (
          <button
            className="border rounded-2xl bg-blue-700 p-2 text-2xl"
            onClick={() => router.push("/dashboard")}
          >
            {"Let's Start"}
          </button>
        ) : (
          <button
            className="border rounded-2xl bg-blue-700 p-2 text-2xl"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
