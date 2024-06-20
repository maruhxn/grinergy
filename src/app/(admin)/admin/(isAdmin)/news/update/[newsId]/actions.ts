"use server";

import NotFoundException from "@/app/exceptions/NotFoundException";
import { NEWS_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { deleteOneFile, uploadOneFile } from "@/libs/db-actions/file";
import { handleError } from "@/libs/utils";
import { revalidateTag } from "next/cache";
import { updateNewsSchema } from "./schema";

export const getR2ImagePath = async (fileKey: string) => {
  return process.env.NODE_ENV === "production"
    ? `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${fileKey}`
    : `${process.env.R2_DEV_ENDPOINT}/${fileKey}`;
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

    if (data.photo instanceof File) {
      const fileKey = await uploadOneFile(data.photo);
      data.photo = fileKey;
      if (news.photo) await deleteOneFile(news.photo);
    }

    const result = updateNewsSchema.safeParse(data);
    if (!result.success) return result.error.flatten();
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
    handleError(error);
  }
};
