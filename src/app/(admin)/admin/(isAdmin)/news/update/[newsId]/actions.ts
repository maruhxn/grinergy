"use server";

import db from "@/libs/db";
import { uploadNewsPhoto } from "@/libs/server-functions";
import fs from "fs/promises";
import { updateNewsSchema } from "./schema";

export const updateNews = async (newsId: string, formData: FormData) => {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    url: formData.get("url"),
    contents: formData.get("contents"),
  };

  const news = await db.news.findUnique({
    where: {
      id: newsId,
    },
    select: {
      photo: true,
    },
  });

  if (!news) throw new Error("뉴스 정보가 없습니다.");

  if (data.photo instanceof File) {
    const filePath = await uploadNewsPhoto(data.photo);
    if (!filePath) throw new Error("파일 저장 에러");
    data.photo = filePath?.toString();
    if (news.photo) await fs.unlink(`./public${news.photo}`);
  }

  const result = updateNewsSchema.safeParse(data);
  if (!result.success) return result.error.flatten();
  const { title, url, contents, photo } = result.data;
  await db.news.update({
    where: {
      id: newsId,
    },
    data: {
      title: title ? title : undefined,
      contents: contents ? contents : undefined,
      url: url ? url : undefined,
      photo,
    },
    select: {
      id: true,
    },
  });
};
