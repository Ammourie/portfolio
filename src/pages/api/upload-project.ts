import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { title, description, mainImage, images } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await sql`
      INSERT INTO "Project" (id, title, description, "mainImage", images, "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        ${title},
        ${description || null},
        ${mainImage || null},
        ${images},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING id, title, description, "mainImage", images, "createdAt", "updatedAt"
    `;

    const insertedProject = result.rows[0];

    res.status(201).json(insertedProject);
  } catch (error) {
    console.error("Error inserting project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the project" });
  }
}
