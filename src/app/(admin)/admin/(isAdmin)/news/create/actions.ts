"use server";

import ValidationException from "@/exceptions/ValidationException";
import { NEWS_COUNT_TAG, NEWS_TAG } from "@/libs/constants";
import db from "@/libs/db";
import handleError from "@/libs/error-handler";
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

    const result = newsSchema.safeParse(data);
    if (!result.success) throw new ValidationException();
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
    return await handleError(error);
  }
}
