"use server";

import db from "@/libs/db";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { newsSchema } from "./schema";

async function uploadImageToLocal(file: File) {
  try {
    const fileData = await file.arrayBuffer();
    await fs.appendFile(
      `./public/uploads/news/${file.name}`,
      Buffer.from(fileData)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function uploadNews(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    url: formData.get("url"),
    contents: formData.get("contents"),
  };

  if (data.photo instanceof File) {
    await uploadImageToLocal(data.photo);
    data.photo = `/uploads/news/${data.photo.name}`;
  }

  const result = newsSchema.safeParse(data);
  if (!result.success) return result.error.flatten();
  const { title, url, contents, photo } = result.data;
  const news = await db.news.create({
    data: {
      title,
      contents,
      url,
      photo,
    },
    select: {
      id: true,
    },
  });

  redirect(`/admin/news`);
}
