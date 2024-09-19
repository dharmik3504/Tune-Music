"use client";

import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export const AppBar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between p-2 m-2 ">
        <div>Tune Music</div>
        <div>
          {session.data?.user ? (
            <button onClick={() => router.push("/dashboard")}>
              {session.data.user.name}
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};
