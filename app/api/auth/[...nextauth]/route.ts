import { mainAuthConfig } from "@/app/lib/mainAuth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

export async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, mainAuthConfig);
}
export { auth as GET, auth as POST };
