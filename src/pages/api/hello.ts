import { sql } from "@vercel/postgres";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let email = req.body.email;
  if (email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(200).json({ success: true, user: user });
    }
  }
  return res.status(200).json({ success: false, message: "User not found" });

  //   try {
  //     const users = await prisma.user.findMany();
  //     res.status(200).json(users);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(500).json({ name: "Error", message: "Failed to fetch users", error: error.message });
  //     } else {
  //       res.status(500).json({ name: "Error", message: "Failed to fetch users", error: "An unknown error occurred" });
  //     }
  //   }
}
