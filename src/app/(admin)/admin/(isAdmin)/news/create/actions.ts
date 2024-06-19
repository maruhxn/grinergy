"use server";

import { NEWS_COUNT_TAG, NEWS_TAG } from "@/libs/constants";
import db from "@/libs/db";
import { uploadNewsPhoto } from "@/libs/query-actions/file.query";
import { handleError } from "@/libs/utils";
import { revalidateTag } from "next/cache";
import { newsSchema } from "./schema";

export async function uploadNews(formData: FormData) {
  try {
    const data = {
      photo: formData.get("photo"),
      title: formData.get("title"),
      url: formData.get("url"),
      contents: formData.get("contents"),
    };

    if (data.photo instanceof File) {
      const filePath = await uploadNewsPhoto(data.photo);
      data.photo = filePath?.toString();
    }

    const result = newsSchema.safeParse(data);
    if (!result.success) return result.error.flatten();
    const { title, url, contents, photo } = result.data;
    await db.news.create({
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

    revalidateTag(NEWS_TAG);
    revalidateTag(NEWS_COUNT_TAG);
  } catch (error) {
    handleError(error);
  }
}
