import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ name: "Error", message: "Failed to fetch users", error: error.message });
    } else {
      res.status(500).json({ name: "Error", message: "Failed to fetch users", error: "An unknown error occurred" });
    }
  }
}
