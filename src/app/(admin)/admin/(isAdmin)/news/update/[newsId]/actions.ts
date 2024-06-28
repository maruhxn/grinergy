"use server";

import NotFoundException from "@/exceptions/NotFoundException";
import ValidationException from "@/exceptions/ValidationException";
import { NEWS_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { deleteOneFile } from "@/libs/db-actions/file";
import handleError from "@/libs/error-handler";
import { revalidateTag } from "next/cache";
import { updateNewsSchema } from "./schema";

export const getR2ImagePath = async (fileKey: string) => {
  return `${process.env.R2_PUBLIC_ENDPOINT}/${fileKey}`;
};

export const updateNews = async (newsId: string, formData: FormData) => {
  try {
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

    if (!news) throw new NotFoundException("뉴스 정보가 없습니다.");

    if (data.photo && news.photo) await deleteOneFile(news.photo);

    const result = updateNewsSchema.safeParse(data);
    if (!result.success) throw new ValidationException();
    const { title, url, contents, photo } = result.data;

    await db.news.update({
      where: {
        id: newsId,
      },
      data: {
        title: title || undefined,
        contents: contents || undefined,
        url: url || undefined,
        photo,
      },
      select: {
        id: true,
      },
    });
    revalidateTag(NEWS_TAG);
  } catch (error) {
    return await handleError(error);
  }
};
