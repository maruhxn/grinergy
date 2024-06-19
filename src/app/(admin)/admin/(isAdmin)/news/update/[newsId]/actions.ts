"use server";

import FileDeleteException from "@/app/exceptions/FileDeleteException";
import { NEWS_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { uploadNewsPhoto } from "@/libs/query-actions/file.query";
import { handleError } from "@/libs/utils";
import fs from "fs/promises";
import { revalidateTag } from "next/cache";
import { updateNewsSchema } from "./schema";

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

    if (!news) throw new Error("뉴스 정보가 없습니다.");

    if (data.photo instanceof File) {
      const filePath = await uploadNewsPhoto(data.photo);
      data.photo = filePath?.toString();
      try {
        if (news.photo) await fs.unlink(`./public${news.photo}`);
      } catch (error) {
        throw new FileDeleteException(
          `다음 경로의 파일 삭제 실패: ./public${news.photo}`
        );
      }
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
    revalidateTag(NEWS_TAG);
  } catch (error) {
    handleError(error);
  }
};
