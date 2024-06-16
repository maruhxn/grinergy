"use server";

import db from "@/libs/db";
import { uploadNewsPhoto } from "@/libs/server-functions";
import { redirect } from "next/navigation";
import { newsSchema } from "./schema";

export async function uploadNews(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    url: formData.get("url"),
    contents: formData.get("contents"),
  };

  if (data.photo instanceof File) {
    const filePath = await uploadNewsPhoto(data.photo);
    if (!filePath) throw new Error("파일 저장 에러");
    data.photo = filePath?.toString();
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
